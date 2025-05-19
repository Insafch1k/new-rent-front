import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements AfterViewInit, OnInit {
  category: 'monthly' | 'daily' = 'monthly';
  districts: string[] = [
    'Авиастроительный',
    'Советский',
    'Приволжский',
    'Ново-Савиновский',
    'Московский',
    'Кировский',
    'Вахитовский'
  ];
  roomCounts: number[] = [1, 2, 3, 4, 5];
  selectedDistrict: string | null = null;
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

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    if (this.isDistrictOpen) {
      this.isRoomCountOpen = false;
    }
  }

  selectDistrict(district: string) {
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

    if (!this.selectedDistrict) {
      this.errorMessage = 'Выберите район';
      return;
    }
    if (!this.selectedRoomCount) {
      this.errorMessage = 'Выберите количество комнат';
      return;
    }

    const preference = {
      category: this.category,
      user_city: 'Казань',
      user_district: this.selectedDistrict,
      user_min_floor: this.minFloor || 2,
      user_max_floor: this.maxFloor || 10,
      user_min_square: this.minSquare || 30.0,
      user_max_square: this.maxSquare || 65.0,
      user_min_price: this.minPrice || 15000,
      user_price: this.maxPrice || 60000,
      user_room_count: this.selectedRoomCount
    };

    const tgId = 6049846765;

    this.preferenceService.createPreference(tgId, preference).subscribe({
      next: (response) => {
        console.log('Preference created successfully:', response);
        this.successMessage = response.message;
        setTimeout(() => {
          this.ngZone.run(() => {
            console.log('Navigating to /take/ad');
            this.router.navigate(['/take/ad'])
              .then(() => console.log('Navigation to /take/ad successful'))
              .catch(err => console.error('Navigation error:', err));
          });
        }, 1000);
      },
      error: (error) => {
        console.error('Error creating preference:', error);
        this.errorMessage = 'Ошибка при сохранении предпочтений';
      }
    });
  }
}