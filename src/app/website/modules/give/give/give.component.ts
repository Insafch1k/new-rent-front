import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss']
})
export class GiveComponent {
  districts = ['Район 1', 'Район 2', 'Район 3'];
  city: string = '';
  address: string = '';
  floorFrom: number | null = null;
  floorTo: number | null = null;
  area: string = '';
  rentalCost: string = '';
  description: string = '';
  selectedDistrict: string = '';
  isDistrictOpen = false;
  imageUrls: string[] = [];
  isOverlayVisible: boolean = false;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  clearCity() {
    this.city = '';
    console.log('City cleared');
  }

  clearAddress() {
    this.address = '';
    console.log('Address cleared');
  }

  clearArea() {
    this.area = '';
    console.log('Area cleared');
  }

  clearRentalCost() {
    this.rentalCost = '';
    console.log('Rental cost cleared');
  }

  clearDescription() {
    this.description = '';
    console.log('Description cleared');
  }

  clearField(field: keyof GiveComponent) {
    (this as any)[field] = null;
    console.log(`Field ${field} cleared`);
  }

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    console.log('District dropdown toggled:', this.isDistrictOpen);
  }

  deleteImage(url: string): void {
    this.imageUrls = this.imageUrls.filter(imageUrl => imageUrl !== url);
    console.log('Image deleted:', url);
    console.log('Remaining images:', this.imageUrls);
  }

  selectDistrict(district: string) {
    this.selectedDistrict = district;
    this.isDistrictOpen = false;
    console.log('Selected district:', district);
  }

  onImageClick(src: string): void {
    this.isOverlayVisible = true;
    console.log('Image clicked:', src);
    console.log('Overlay visible:', this.isOverlayVisible);
    this.cdr.detectChanges(); // Вручную запускаем обновление
  }

  onBackgroundClick(): void {
    this.isOverlayVisible = false;
    console.log('Background clicked');
    console.log('Overlay visible:', this.isOverlayVisible);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    console.log('Files selected:', files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
          console.log('Image loaded:', e.target.result);
          if (this.imageUrls.length > 10) {
            this.imageUrls = this.imageUrls.slice(0, 10);
            console.log('Image limit reached, sliced to 10');
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.log('File not loaded:', file.name, 'Exceeds size limit or invalid type');
      }
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
    console.log('File input triggered');
  }
}
