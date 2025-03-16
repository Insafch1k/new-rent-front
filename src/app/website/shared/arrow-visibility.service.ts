import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrowVisibilityService {
  private showArrowSubject = new BehaviorSubject<boolean>(true);
  showArrow$ = this.showArrowSubject.asObservable();

  setShowArrow(show: boolean) {
    this.showArrowSubject.next(show);
  }
}
