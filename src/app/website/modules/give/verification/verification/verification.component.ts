import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { VerificationService } from '../services/verification.service';
import { VerificationRequest, VerificationResponse, VerificationStatusResponse } from '../verification.model';
import { LoadingService } from 'src/app/website/shared/loading-spinner/loading.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  @ViewChild('passportInput') passportInput!: ElementRef<HTMLInputElement>;
  @ViewChild('egrnInput') egrnInput!: ElementRef<HTMLInputElement>;

  passportImage: string | null = null;
  egrnImage: string | null = null;
  verificationStatus: 'not_submitted' | 'consideration' | 'approved' | 'rejected' = 'not_submitted';
  private readonly telegramId = '825963774';
  private itFirst: boolean = true;

  constructor(
    private verificationService: VerificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.verificationService.getVerificationStatus(this.telegramId).subscribe({
      next: (response: VerificationStatusResponse) => {
        this.verificationStatus = response.status;
        if (response.passport_photo) {
          this.passportImage = response.passport_photo;
        }
        if (response.egrn_photo) {
          this.egrnImage = response.egrn_photo;
        }
        this.itFirst = this.verificationStatus !== 'rejected';
      },
      error: (error) => {
        console.error('Ошибка получения статуса верификации:', error);
        this.verificationStatus = 'not_submitted';
      },
      complete: () => {
        this.loadingService.hide();
      }
    });
  }

  triggerFileInput(type: 'passport' | 'egrn', event: MouseEvent) {
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
      this.passportInput.nativeElement.value = '';
    } else {
      this.egrnImage = null;
      this.egrnInput.nativeElement.value = '';
    }
  }

  onSubmit() {
    if (!this.passportImage || !this.egrnImage) {
      alert('Пожалуйста, загрузите оба документа');
      return;
    }

    const request: VerificationRequest = {
      passport_photo: this.passportImage,
      egrn_photo: this.egrnImage,
      telegram_id: this.telegramId,
      it_first: this.itFirst
    };

    this.loadingService.show();
    this.verificationService.submitVerification(request).subscribe({
      next: (response: VerificationResponse) => {
        alert(`Верификация отправлена!`);
        this.verificationStatus = 'consideration';
      },
      error: (error) => {
        alert(`Ошибка верификации :(`);
      },
      complete: () => {
        this.loadingService.hide();
      }
    });
  }
}