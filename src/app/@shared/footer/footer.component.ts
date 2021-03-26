import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@shared/navigation.service';
import { NavItemModel } from '@core/model/nav-item.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  primaryNavItems: NavItemModel[];
  socialNavItems: NavItemModel[];
  ternaryNavItems: NavItemModel[];

  constructor(private _navigation: NavigationService) {}

  ngOnInit() {
    this._getPrimaryNavigationItems();
    this._getTernaryNavigationItems();
    this._getSocialNavigationItems();
  }

  private _getPrimaryNavigationItems() {
    this.primaryNavItems = this._navigation.getPrimaryNavigationItems();
  }
  private _getTernaryNavigationItems() {
    this.ternaryNavItems = this._navigation.getTernaryNavigationItems();
  }
  private _getSocialNavigationItems() {
    this.socialNavItems = this._navigation.getSocialNavigationItems();
  }
}
