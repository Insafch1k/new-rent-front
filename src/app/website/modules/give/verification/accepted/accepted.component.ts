import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent {
  constructor(private router: Router) {}

  onRentApartment() {
    this.router.navigate(['/give']);
  }
}