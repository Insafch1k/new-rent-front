import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowVisibilityService } from '../../shared/arrow-visibility.service';
import { PreferenceService } from '../../modules/take/services/preference.service';
import { TelegramService } from '../../services/telegram.service'; // путь может отличаться у тебя

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private tgId: number;

  constructor(
    private arrowVisibilityService: ArrowVisibilityService,
    private preferenceService: PreferenceService,
    private router: Router,
    private telegramService: TelegramService
  ) {
    this.tgId = this.telegramService.getTelegramId()!;
  }

  ngOnInit() {
    this.arrowVisibilityService.setShowArrow(false);
  }

  ngOnDestroy() {
    this.arrowVisibilityService.setShowArrow(true);
  }

  checkAndNavigate() {
    this.preferenceService.checkPreferences(this.tgId).subscribe({
      next: (response) => {
        console.log('Preferences check response:', response);
        if (response.has_preferences) {
          console.log('User has preferences, navigating to /take/ad');
          this.router.navigate(['/take/ad']);
        } else {
          console.log('User has no preferences, navigating to /take/take');
          this.router.navigate(['/take']);
        }
      },
      error: (error) => {
        console.error('Error checking preferences:', error);
        this.router.navigate(['/take']);
      }
    });
  }
}
