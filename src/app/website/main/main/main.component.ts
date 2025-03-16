import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArrowVisibilityService } from '../../shared/arrow-visibility.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private arrowVisibilityService: ArrowVisibilityService) {}

  ngOnInit() {
    this.arrowVisibilityService.setShowArrow(false);
  }

  ngOnDestroy() {
    this.arrowVisibilityService.setShowArrow(true);
  }
}