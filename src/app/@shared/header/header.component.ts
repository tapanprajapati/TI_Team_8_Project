import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from '@core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { faCookieBite, faBars } from '@fortawesome/free-solid-svg-icons';

import { NavItemModel } from '@core/model/nav-item.model';
import { NavigationService } from '@shared/navigation.service';
import { AuthenticationService } from '@app/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCookieBite = faCookieBite;
  faBars = faBars;
  primaryNavItems: NavItemModel[];
  secondaryNavItems: NavItemModel[];
  isLoggedIn = false;
  isAdmin = false;

  changedHeaderColor: boolean;

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(
    private _navigation: NavigationService,
    private _media: MediaObserver,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this._getPrimaryNavigationItems();
    this._getSecondaryNavigationItems();
    this._handleMobileMenu();
    this._handleLoginHandler();
    this._handleAdminStatus();
  }

  ngOnDestroy() {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.changedHeaderColor = window.pageYOffset > 65;
  }

  logout() {
    this._authenticationService.logout();
  }

  private _getPrimaryNavigationItems() {
    this.primaryNavItems = this._navigation.getPrimaryNavigationItems();
  }

  private _getSecondaryNavigationItems() {
    this.secondaryNavItems = this._navigation.getSecondaryNavigationItems();
  }

  private _handleMobileMenu() {
    // Automatically close side menu on screens > sm breakpoint
    // REF: @ngx-rocket header responsive handler
    this._media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some((change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')
        ),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
  }

  private _handleLoginHandler() {
    this._authenticationService.isLoggedIn.pipe(untilDestroyed(this)).subscribe((val) => {
      this.isLoggedIn = val;
    });
  }

  private _handleAdminStatus() {
    this._authenticationService.isAdmin.pipe(untilDestroyed(this)).subscribe((val) => {
      this.isAdmin = val;
    });
  }
}
