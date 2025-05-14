import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  @ViewChild('passportInput') passportInput!: ElementRef<HTMLInputElement>;
  @ViewChild('egrnInput') egrnInput!: ElementRef<HTMLInputElement>;

  passportImage: string | null = null;
  egrnImage: string | null = null;

  triggerFileInput(type: 'passport' | 'egrn', event: MouseEvent) {
    // Предотвращаем запуск загрузки, если клик был на иконке удаления
    if ((event.target as HTMLElement).closest('.delete-icon')) {
      return;
    }
    if (type === 'passport') {
      this.passportInput.nativeElement.click();
    } else {
      this.egrnInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event, type: 'passport' | 'egrn') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'passport') {
          this.passportImage = reader.result as string;
        } else {
          this.egrnImage = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(type: 'passport' | 'egrn') {
    if (type === 'passport') {
      this.passportImage = null;
      this.passportInput.nativeElement.value = ''; // Очищаем input
    } else {
      this.egrnImage = null;
      this.egrnInput.nativeElement.value = ''; // Очищаем input
    }
  }
}