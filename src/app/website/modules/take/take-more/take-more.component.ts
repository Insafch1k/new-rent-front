import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TakeService } from '../services/take.service';
import { PreferenceService } from '../services/preference.service';
import { GetPreferenceResponse, Preference } from '../take.model';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Component({
  selector: 'app-take-more',
  templateUrl: './take-more.component.html',
  styleUrls: ['./take-more.component.scss']
})
export class TakeMoreComponent implements AfterViewInit {
  durations = ['длительное проживание', 'посуточное проживание'];
  roomCounts = [1, 2, 3, 4, 5];
  cities: { id: number, name: string }[] = [];
  districts: { id: number, name: string }[] = [];
  selectedCity: { id: number, name: string } | null = null;
  selectedDistrict: { id: number, name: string } | null = null;
  floorFrom: number | null = null;
  floorTo: number | null = null;
  areaFrom: number | null = null;
  areaTo: number | null = null;
  rentFrom: number | null = null;
  rentTo: number | null = null;
  selectedDurations: string[] = [];
  isDurationOpen: boolean = false;
  selectedRoomCounts: number[] = [];
  isRoomCountOpen: boolean = false;
  isCityOpen: boolean = false;
  isDistrictOpen: boolean = false;

  @ViewChild('districtSelect') districtSelect!: ElementRef;
  @ViewChild('durationSelect') durationSelect!: ElementRef;
  @ViewChild('roomCountSelect') roomCountSelect!: ElementRef;
  @ViewChild('citySelect') citySelect!: ElementRef;

  constructor(
    private takeService: TakeService,
    private preferenceService: PreferenceService,
    private router: Router,
    private telegramService: TelegramService
  ) {
    this.loadCities();
    this.loadPreferences();
  }

  ngAfterViewInit() {
    if (this.districtSelect) {
      this.districtSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
    if (this.durationSelect) {
      this.durationSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
    if (this.roomCountSelect) {
      this.roomCountSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
    if (this.citySelect) {
      this.citySelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.districtSelect?.nativeElement.contains(event.target as Node)) {
      this.isDistrictOpen = false;
    }
    if (!this.durationSelect?.nativeElement.contains(event.target as Node)) {
      this.isDurationOpen = false;
    }
    if (!this.roomCountSelect?.nativeElement.contains(event.target as Node)) {
      this.isRoomCountOpen = false;
    }
    if (!this.citySelect?.nativeElement.contains(event.target as Node)) {
      this.isCityOpen = false;
    }
  }

  loadCities() {
    this.preferenceService.getCities().subscribe({
      next: (response) => {
        this.cities = response.cities;
        this.selectedCity = this.cities.find(c => c.name === 'Казань') || null;
        if (this.selectedCity) {
          this.loadDistricts(this.selectedCity.id);
        }
      },
      error: () => {
        console.error('Ошибка загрузки городов');
      }
    });
  }

  loadDistricts(cityId: number) {
    if (cityId === 1) {
      this.preferenceService.getDistricts(cityId).subscribe({
        next: (response) => {
          this.districts = response.districts;
        },
        error: () => {
          console.error('Ошибка загрузки районов');
        }
      });
    } else {
      this.districts = [];
      this.selectedDistrict = null;
    }
  }

  loadPreferences() {
    this.takeService.getPreference().subscribe({
      next: (response: GetPreferenceResponse) => {
        const pref = response.preference;
        this.selectedCity = this.cities.find(c => c.id === pref.user_city) || null;
        if (this.selectedCity && pref.user_district) {
          this.loadDistricts(this.selectedCity.id); // Загружаем районы, если город выбран
          this.selectedDistrict = this.districts.find(d => d.id === pref.user_district) || null;
        }
        this.selectedDurations = [pref.category === 'monthly' ? 'длительное проживание' : 'посуточное проживание'];
        this.selectedRoomCounts = pref.user_room_count ? [pref.user_room_count] : [];
        this.floorFrom = pref.user_min_floor;
        this.floorTo = pref.user_max_floor;
        this.areaFrom = pref.user_min_square;
        this.areaTo = pref.user_max_square;
        this.rentFrom = pref.user_min_price;
        this.rentTo = pref.user_price;
      },
      error: (error) => {
        console.error('Ошибка загрузки предпочтений:', error);
        if (error.message === 'Telegram ID не найден') {
          this.router.navigate(['/welcome']);
        }
      }
    });
  }

  savePreferences() {
    if (!this.selectedCity) {
      console.error('Город не выбран');
      return;
    }

    const preference: Preference = {
      category: this.selectedDurations.includes('длительное проживание') ? 'monthly' : 'daily',
      user_city: this.selectedCity.id,
      user_district: this.selectedCity.id === 1 && this.selectedDistrict ? this.selectedDistrict.id : null,
      user_max_floor: this.floorTo || 1000,
      user_max_square: this.areaTo || 10000,
      user_min_floor: this.floorFrom || 0,
      user_min_price: this.rentFrom || 0,
      user_min_square: this.areaFrom || 0,
      user_price: this.rentTo || 100000,
      user_room_count: this.selectedRoomCounts[0] || null
    };

    this.takeService.updatePreference(preference).subscribe({
      next: (response) => {
        console.log('Предпочтения обновлены:', response);
        this.router.navigate(['/take/ad']);
      },
      error: (error) => {
        console.error('Ошибка обновления предпочтений:', error);
        if (error.message === 'Telegram ID не найден') {
          this.router.navigate(['/welcome']);
        }
      }
    });
  }

  toggleCityDropdown() {
    this.isCityOpen = !this.isCityOpen;
    this.isDistrictOpen = false;
    this.isDurationOpen = false;
    this.isRoomCountOpen = false;
  }

  selectCity(city: { id: number, name: string }) {
    this.selectedCity = city;
    this.loadDistricts(city.id);
    this.selectedDistrict = null;
    this.isCityOpen = false;
  }

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    if (this.isDistrictOpen) {
      this.isDurationOpen = false;
      this.isRoomCountOpen = false;
      this.isCityOpen = false;
    }
  }

  toggleDistrictSelection(district: { id: number, name: string }) {
    this.selectedDistrict = district;
    this.isDistrictOpen = false;
  }

  isDistrictSelected(district: { id: number, name: string }): boolean {
    return this.selectedDistrict?.id === district.id;
  }

  toggleDurationDropdown() {
    this.isDurationOpen = !this.isDurationOpen;
    if (this.isDurationOpen) {
      this.isDistrictOpen = false;
      this.isRoomCountOpen = false;
      this.isCityOpen = false;
    }
  }

  toggleDurationSelection(duration: string) {
    this.selectedDurations = [duration];
    this.isDurationOpen = false;
  }

  isDurationSelected(duration: string): boolean {
    return this.selectedDurations.includes(duration);
  }

  toggleRoomCountDropdown() {
    this.isRoomCountOpen = !this.isRoomCountOpen;
    if (this.isRoomCountOpen) {
      this.isDistrictOpen = false;
      this.isDurationOpen = false;
      this.isCityOpen = false;
    }
  }

  toggleRoomCountSelection(count: number) {
    this.selectedRoomCounts = [count];
    this.isRoomCountOpen = false;
  }

  isRoomCountSelected(count: number): boolean {
    return this.selectedRoomCounts.includes(count);
  }

  clearField(field: 'floorFrom' | 'floorTo' | 'areaFrom' | 'areaTo' | 'rentFrom' | 'rentTo') {
    this[field] = null;
  }
}