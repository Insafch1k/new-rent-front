import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreferenceService } from '../services/preference.service';
import { Preference } from '../models/preference.model';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements AfterViewInit, OnInit {
  category: 'monthly' | 'daily' = 'monthly';
  roomCounts: number[] = [1, 2, 3, 4, 5];
  isDistrictOpen: boolean = false;
  selectedRoomCount: number | null = null;
  isRoomCountOpen: boolean = false;
  minFloor: number | null = null;
  maxFloor: number | null = null;
  minSquare: number | null = null;
  maxSquare: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  cities: { id: number; name: string }[] = [];
  districts: { id: number; name: string }[] = [];
  selectedCity: { id: number, name: string } | null = null;
  selectedDistrict: { id: number, name: string } | null = null;
  isCityOpen: boolean = false;


  @ViewChild('districtSelect') districtSelect!: ElementRef;
  @ViewChild('roomCountSelect') roomCountSelect!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preferenceService: PreferenceService,
    private ngZone: NgZone
  ) {
    console.log('TakeComponent constructor called');
    this.route.queryParams.subscribe(params => {
      const paramCategory = params['category'];
      this.category = paramCategory === 'daily' ? 'daily' : 'monthly';
      console.log('TakeComponent category set to:', this.category);
    });
  }

  ngOnInit() {
    console.log('TakeComponent ngOnInit called');
    this.loadCities();
  }

  ngAfterViewInit() {
    console.log('TakeComponent ngAfterViewInit called');
    if (this.districtSelect) {
      this.districtSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
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
    if (!this.districtSelect.nativeElement.contains(event.target as Node)) {
      this.isDistrictOpen = false;
    }
    if (!this.roomCountSelect.nativeElement.contains(event.target as Node)) {
      this.isRoomCountOpen = false;
    }
  }

  toggleCityDropdown() {
    this.isCityOpen = !this.isCityOpen;
    this.isDistrictOpen = false;
    this.isRoomCountOpen = false;
  }

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    if (this.isDistrictOpen) {
      this.isRoomCountOpen = false;
    }
  }

  selectCity(city: { id: number, name: string }) {
    this.selectedCity = city;
    this.loadDistricts(city.id);  // если Казань — грузим районы
    this.selectedDistrict = null; // сбрасываем район при смене города
    this.isCityOpen = false;
  }
  
  selectDistrict(district: { id: number, name: string }) {
    this.selectedDistrict = district;
    this.isDistrictOpen = false;
  }

  toggleRoomCountDropdown() {
    this.isRoomCountOpen = !this.isRoomCountOpen;
    if (this.isRoomCountOpen) {
      this.isDistrictOpen = false;
    }
  }

  selectRoomCount(count: number) {
    this.selectedRoomCount = count;
    this.isRoomCountOpen = false;
  }

  clearField(field: keyof TakeComponent) {
    (this as any)[field] = null;
  }

  submitPreference() {
    this.errorMessage = null;
    this.successMessage = null;
  
    if (!this.selectedCity) {
      this.errorMessage = 'Выберите город';
      return;
    }
  
    if (this.selectedCity.id === 1 && !this.selectedDistrict) {
      this.errorMessage = 'Выберите район для Казани';
      return;
    }
  
    const preference: Preference = {
      category: this.category,
      user_city: this.selectedCity.id,
      user_district: this.selectedCity.id === 1 && this.selectedDistrict ? this.selectedDistrict.id : null,
      user_min_floor: this.minFloor || 2,
      user_max_floor: this.maxFloor || 10,
      user_min_square: this.minSquare || 30.0,
      user_max_square: this.maxSquare || 65.0,
      user_min_price: this.minPrice || 15000,
      user_price: this.maxPrice || 60000,
      user_room_count: this.selectedRoomCount
    };
    
  
    const tgId = 825963774;
  
    this.preferenceService.createPreference(tgId, preference).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigateByUrl('/take/ad');
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'Ошибка при сохранении предпочтений';
      }
    });
  }
  
  
  
  



  loadCities() {
    this.preferenceService.getCities().subscribe({
      next: (response) => {
        this.cities = response.cities;
        this.selectedCity = this.cities.find(c => c.name === 'Казань') || null;
        if (this.selectedCity) this.loadDistricts(this.selectedCity.id);
      },
      error: () => this.errorMessage = 'Ошибка загрузки городов'
    });
  }
  
  loadDistricts(cityId: number) {
    if (cityId === 1) {
      this.preferenceService.getDistricts(cityId).subscribe({
        next: (response) => {
          this.districts = response.districts;
        },
        error: () => this.errorMessage = 'Ошибка загрузки районов'
      });
    } else {
      this.districts = [];
      this.selectedDistrict = null;
    }
  }
}