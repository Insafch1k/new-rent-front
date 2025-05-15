import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private ngZone: NgZone) {}

  show() {
    this.ngZone.run(() => {
      console.log('LoadingService: show() called');
      this.loadingSubject.next(true);
    });
  }

  hide() {
    this.ngZone.run(() => {
      console.log('LoadingService: hide() called');
      this.loadingSubject.next(false);
    });
  }
}