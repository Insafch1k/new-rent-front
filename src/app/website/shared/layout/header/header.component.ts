import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { ArrowVisibilityService } from '../../arrow-visibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showArrow: boolean = false;
  showSlider: boolean = false;
  pageTitle: string = '';
  currentUrl: string = '';
  showHeader: boolean = true;

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private arrowVisibilityService: ArrowVisibilityService
  ) {}

  ngOnInit() {
    this.arrowVisibilityService.showArrow$.subscribe(show => {
      this.showArrow = show;
    });

    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route: ActivatedRoute) => route.outlet === 'primary')
    ).subscribe((route: ActivatedRoute) => {
      this.currentUrl = this.router.url;
      this.showSlider = this.currentUrl === '/take/ad';
      this.showHeader = this.currentUrl !== '/welcome'; // Скрываем хедер на странице /welcome
      this.updatePageTitle(route);
    });
  }

  updatePageTitle(route: ActivatedRoute) {
    const title = route.snapshot.data['title'];
    this.pageTitle = title || 'Главная';
  }

  goBack() {
    if (this.currentUrl === '/take/ad') {
      this.router.navigate(['/main']);
    } else {
      this.location.back();
    }
  }
}
