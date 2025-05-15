import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consideration',
  templateUrl: './consideration.component.html',
  styleUrls: ['./consideration.component.scss']
})
export class ConsiderationComponent {
  constructor(private router: Router) {}
  
   onGoToMain() {
    this.router.navigate(['/']); // Перенаправление на главную
  }
}
