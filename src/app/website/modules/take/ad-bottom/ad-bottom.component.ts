import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ad-bottom',
  templateUrl: './ad-bottom.component.html',
  styleUrls: ['./ad-bottom.component.scss']
})
export class AdBottomComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}