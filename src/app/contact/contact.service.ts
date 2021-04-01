/**
 *
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogConfig } from '@angular/material/dialog';
import { environment } from '@env/environment';

import { ContactUsModel } from '../@core/model/contactUs.model';
import { ApiResponseModel } from '@core/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  formData: ContactUsModel;

  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };
  constructor(private _http: HttpClient) {}

  postMessage(formData: ContactUsModel) {
    return this._http.post<ApiResponseModel>(this._getUrl(), formData);
  }
  private _getUrl() {
    return `${environment.serverUrl}contactUs`;
  }
}
