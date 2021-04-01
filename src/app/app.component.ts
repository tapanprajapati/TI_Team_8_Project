import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './auth/authentication.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    onNavigationEnd
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(title);
        }
      });

    this._authenticationService.appAuthAndRoleChecker(this.router.routerState.snapshot);
  }

  ngOnDestroy() {}
}
