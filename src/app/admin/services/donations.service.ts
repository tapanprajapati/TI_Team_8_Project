import { Donations, DonationsResponse } from '../../@core/model/donation.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  readonly URL = `${this._getUrl()}`;

  constructor(private http: HttpClient) {}

  getDonations() {
    console.log(this.URL);
    return this.http.get<DonationsResponse>(this.URL + 'donations');
  }

  private _getUrl() {
    return `${environment.serverUrl}`;
  }
}
