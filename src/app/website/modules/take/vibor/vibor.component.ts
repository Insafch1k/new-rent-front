import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vibor',
  templateUrl: './vibor.component.html',
  styleUrls: ['./vibor.component.scss']
})
export class ViborComponent {
  constructor(private router: Router, private ngZone: NgZone) {}

  navigateToTake(category: 'monthly' | 'daily') {
    console.log(`Navigating to /take/take with category: ${category}`);
    this.ngZone.run(() => {
      this.router.navigate(['/take/take'], { queryParams: { category } })
        .then(() => console.log('Navigation successful'))
        .catch(err => {
          console.error('Navigation error with router:', err);
          console.log('Falling back to window.location');
          window.location.href = `/take/take?category=${category}`;
        });
    });
  }
}