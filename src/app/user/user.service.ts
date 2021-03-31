import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth/authentication.service';
import { GlobalErrorService } from '@core/services/global-error.service';

import { ApiResponseModel } from '@core/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {
  constructor(
    private _authenticationService: AuthenticationService,
    private _http: HttpClient,
    private _globalErrorService: GlobalErrorService
  ) {}

  ngOnDestroy() {}

  getUser(email: string): Observable<ApiResponseModel> {
    return this._http
      .get<ApiResponseModel>(`${this._getUserUrl()}/${email}`, { headers: this._getAuthorizationHeader() })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  updateUser(user: any, email: string) {
    return this._http
      .put<ApiResponseModel>(`${this._getUserUrl()}/${email}`, user, { headers: this._getAuthorizationHeader() })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  private _getUserUrl() {
    return `${environment.serverUrl}user`;
  }

  private _getAuthorizationHeader(): HttpHeaders {
    return this._authenticationService.getAuthorizationHeader();
  }
}
