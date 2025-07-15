import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TakeService } from '../services/take.service';
import { PreferenceService } from '../services/preference.service';
import { GetPreferenceResponse } from '../take.model';
import { Preference } from '../take.model';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Component({
  selector: 'app-take-more',
  templateUrl: './take-more.component.html',
  styleUrls: ['./take-more.component.scss']
})
export class TakeMoreComponent implements AfterViewInit {
  districts = ['Вахитовский', 'Советский', 'Приволжский', 'Кировский', 'Московский', 'Авиастроительный', 'Ново-Савиновский'];
  durations = ['длительное проживание', 'посуточное проживание'];
  roomCounts = [1, 2, 3, 4, 5];
  city: string = 'Казань';
  floorFrom: number | null = null;
  floorTo: number | null = null;
  areaFrom: number | null = null;
  areaTo: number | null = null;
  rentFrom: number | null = null;
  rentTo: number | null = null;
  selectedDistricts: string[] = [];
  isDistrictOpen: boolean = false;
  selectedDurations: string[] = [];
  isDurationOpen: boolean = false;
  selectedRoomCounts: number[] = [];
  isRoomCountOpen: boolean = false;

  @ViewChild('districtSelect') districtSelect!: ElementRef;
  @ViewChild('durationSelect') durationSelect!: ElementRef;
  @ViewChild('roomCountSelect') roomCountSelect!: ElementRef;

  constructor(
    private takeService: TakeService,
    private router: Router,
    private telegramService: TelegramService
  ) {
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
  }

  loadPreferences() {
    this.takeService.getPreference().subscribe({
      next: (response: GetPreferenceResponse) => {
        const pref = response.preference;
        this.city = pref.user_city;
        this.selectedDistricts = pref.user_district ? [pref.user_district] : [];
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
    const preference: Preference = {
      category: this.selectedDurations.includes('длительное проживание') ? 'monthly' : 'daily',
      user_city: this.city,
      user_district: this.selectedDistricts[0] || '',
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

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    if (this.isDistrictOpen) {
      this.isDurationOpen = false;
      this.isRoomCountOpen = false;
    }
  }

  toggleDistrictSelection(district: string) {
    this.selectedDistricts = [district]; // Выбираем только один район
    this.isDistrictOpen = false;
  }

  isDistrictSelected(district: string): boolean {
    return this.selectedDistricts.includes(district);
  }

  toggleDurationDropdown() {
    this.isDurationOpen = !this.isDurationOpen;
    if (this.isDurationOpen) {
      this.isDistrictOpen = false;
      this.isRoomCountOpen = false;
    }
  }

  toggleDurationSelection(duration: string) {
    this.selectedDurations = [duration]; // Выбираем только одну длительность
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
    }
  }

  toggleRoomCountSelection(count: number) {
    this.selectedRoomCounts = [count]; // Выбираем только одно количество комнат
    this.isRoomCountOpen = false;
  }

  isRoomCountSelected(count: number): boolean {
    return this.selectedRoomCounts.includes(count);
  }

  clearField(field: 'floorFrom' | 'floorTo' | 'areaFrom' | 'areaTo' | 'rentFrom' | 'rentTo') {
    this[field] = null;
  }
}
