import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ListingService, ListingRequest, ListingResponse } from '../services/listing.service';
import { LoadingService } from 'src/app/website/shared/loading-spinner/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss']
})
export class GiveComponent {
  cities = ['Казань'];
  districts = ['Советский', 'Навосовинский', 'Московский', 'Кировский', 'Приволжский', 'Авиостроительный'];
  roomsList = ['1', '2', '3', '4', '5', '6'];
  districtIds: { [key: string]: number } = {
    'Советский': 1,
    'Навосовинский': 2,
    'Московский': 3,
    'Кировский': 4,
    'Приволжский': 5,
    'Авиостроительный': 6
  };
  selectedCity: string = 'Казань';
  selectedDistrict: string = '';
  selectedRooms: string = '';
  address: string = '';
  floor: number | null = null;
  area: number | null = null;
  rentalCost: number | null = null;
  deposit: number | null = null;
  contact: string = '+7'; // Инициализация с +7
  description: string = '';
  imageUrls: string[] = [];
  isCityOpen = false;
  isDistrictOpen = false;
  isRoomsOpen = false;
  isOverlayVisible: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private readonly telegramId = 6049846765; // Константа для telegram_id

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('singleFileInput', { static: false }) singleFileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private listingService: ListingService,
    private loadingService: LoadingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  toggleCityDropdown() {
    this.isCityOpen = !this.isCityOpen;
    console.log('City dropdown toggled:', this.isCityOpen);
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.isCityOpen = false;
    console.log('Selected city:', city);
  }

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    console.log('District dropdown toggled:', this.isDistrictOpen);
  }

  selectDistrict(district: string) {
    this.selectedDistrict = district;
    this.isDistrictOpen = false;
    console.log('Selected district:', district);
  }

  toggleRoomsDropdown() {
    this.isRoomsOpen = !this.isRoomsOpen;
    console.log('Rooms dropdown toggled:', this.isRoomsOpen);
  }

  selectRoom(room: string) {
    this.selectedRooms = room;
    this.isRoomsOpen = false;
    console.log('Selected room:', room);
  }

  clearAddress() {
    this.address = '';
    console.log('Address cleared');
  }

  clearArea() {
    this.area = null;
    console.log('Area cleared');
  }

  clearRentalCost() {
    this.rentalCost = null;
    console.log('Rental cost cleared');
  }

  clearDeposit() {
    this.deposit = null;
    console.log('Deposit cleared');
  }

  clearContact() {
    this.contact = '+7';
    console.log('Contact cleared');
    this.cdr.detectChanges();
  }

  clearDescription() {
    this.description = '';
    console.log('Description cleared');
  }

  clearField(field: 'floor' | 'area' | 'rentalCost' | 'deposit') {
    this[field] = null;
    console.log(`Field ${field} cleared`);
  }

  formatPhoneNumber() {
    let value = this.contact.replace(/\D/g, '');
    if (!value.startsWith('7')) {
      value = '7' + value;
    }

    value = value.slice(0, 11);

    let formatted = '+7';
    if (value.length > 1) {
      formatted += ' (' + value.slice(1, Math.min(4, value.length));
    }
    if (value.length > 4) {
      formatted += ') ' + value.slice(4, Math.min(7, value.length));
    }
    if (value.length > 7) {
      formatted += '-' + value.slice(7, Math.min(9, value.length));
    }
    if (value.length > 9) {
      formatted += '-' + value.slice(9, 11);
    }

    this.contact = formatted;
    this.cdr.detectChanges();
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
            if (this.imageUrls.length > 10) {
              this.imageUrls = this.imageUrls.slice(0, 10);
            }
            this.cdr.detectChanges();
            console.log('Image loaded:', e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          this.errorMessage = 'Файл превышает 5 МБ или имеет неверный формат';
        }
      }
    }
  }

  onSingleFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
          if (this.imageUrls.length > 10) {
            this.imageUrls = this.imageUrls.slice(0, 10);
          }
          this.cdr.detectChanges();
          console.log('Single image loaded:', e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Файл превышает 5 МБ или имеет неверный формат';
      }
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
    console.log('File input triggered');
  }

  deleteImage(url: string): void {
    this.imageUrls = this.imageUrls.filter(imageUrl => imageUrl !== url);
    this.cdr.detectChanges();
    console.log('Image deleted:', url);
  }

  onImageClick(src: string): void {
    this.isOverlayVisible = true;
    console.log('Image clicked:', src);
    this.cdr.detectChanges();
  }

  onBackgroundClick(): void {
    this.isOverlayVisible = false;
    console.log('Background clicked');
    this.cdr.detectChanges();
  }

  validateForm(): boolean {
    this.errorMessage = '';
    if (!this.selectedCity) {
      this.errorMessage = 'Выберите город';
      return false;
    }
    if (!this.selectedDistrict) {
      this.errorMessage = 'Выберите район';
      return false;
    }
    if (!this.address.trim()) {
      this.errorMessage = 'Введите адрес';
      return false;
    }
    if (!this.floor) {
      this.errorMessage = 'Введите этаж';
      return false;
    }
    if (!this.area || this.area <= 0) {
      this.errorMessage = 'Введите корректную площадь';
      return false;
    }
    if (!this.rentalCost || this.rentalCost <= 0) {
      this.errorMessage = 'Введите корректную стоимость сдачи';
      return false;
    }
    if (!this.deposit || this.deposit < 0) {
      this.errorMessage = 'Введите корректный депозит';
      return false;
    }
    const digits = this.contact.replace(/\D/g, '');
    if (!digits || digits.length !== 11 || !digits.startsWith('7')) {
      this.errorMessage = 'Введите корректный номер телефона (+7 и 10 цифр)';
      return false;
    }
    if (!this.description.trim()) {
      this.errorMessage = 'Введите описание';
      return false;
    }
    if (!this.selectedRooms) {
      this.errorMessage = 'Выберите количество комнат';
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const listing: ListingRequest = {
      address: this.address.trim(),
      category: 'monthly',
      city_id: 1, // Казань
      contact: this.contact.trim(), // Отправляем в формате +7 (912) 456-78-90
      deposit: this.deposit!.toString(),
      description: this.description.trim(),
      district_id: this.districtIds[this.selectedDistrict],
      floor: this.floor!,
      photos: this.imageUrls,
      price: this.rentalCost!,
      rooms: this.selectedRooms,
      square: this.area!,
      user_id: this.telegramId // Используем константный telegram_id
    };

    this.loadingService.show();
    this.listingService.addListing(listing).subscribe({
      next: (response: ListingResponse) => {
        this.successMessage = `Объявление успешно добавлено! ID: ${response.id}`;
        this.errorMessage = '';
        this.resetForm();
        this.router.navigate(['/my']);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.successMessage = '';
      },
      complete: () => {
        this.loadingService.hide();
      }
    });
  }

  resetForm(): void {
    this.selectedDistrict = '';
    this.address = '';
    this.floor = null;
    this.area = null;
    this.rentalCost = null;
    this.deposit = null;
    this.contact = '+7';
    this.description = '';
    this.selectedRooms = '';
    this.imageUrls = [];
    this.cdr.detectChanges();
  }
}