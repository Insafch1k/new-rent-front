import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/website/shared/loading-spinner/loading.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent {
  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}

  onGoToMain() {
    this.loadingService.show();
    this.router.navigate(['/']).then(() => {
      this.loadingService.hide();
    });
  }

  onRetryVerification() {
    this.loadingService.show();
    this.router.navigate(['/verification']).then(() => {
      this.loadingService.hide();
    });
  }
}