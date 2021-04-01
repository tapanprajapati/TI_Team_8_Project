import { UserModel } from './../@core/model/user.model';
/**
 * @author Samkit Shah <samkit@dal.ca>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordSerice {
  constructor(private _http: HttpClient) {}

  // Send POST Request to the server
  resetPassword(data: object) {
    try {
      console.log(data);
      return this._http.post<any>(`${environment.serverUrl}resetpassword/`, data);
    } catch (e) {
      throw new Error();
    }
  }
}
