import { UserModel } from '../@core/model/user.model';
/**
 * @author Tapan Prajapati <Tapan.Prajapati@dal.ca>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { catchError } from 'rxjs/operators';
import { GlobalErrorService } from '@app/@core/services/global-error.service';

@Injectable({ providedIn: 'root' })
export class UpdatePasswordService {
  constructor(private _httpClient: HttpClient, private _globalErrorService: GlobalErrorService) {}

  convertToken(token: string): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}converttoken/${token}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  getToken(bannerId: string) {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}resettoken/${bannerId}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  updatePassword(bannerId: string, password: string) {
    return this._httpClient
      .put<ApiResponseModel>(`${this._getUrl()}updatepassword/${bannerId}`, { password: password })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  removeToken(bannerId: string) {
    return this._httpClient
      .put<ApiResponseModel>(`${this._getUrl()}removetoken/${bannerId}`, {})
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  private _getUrl() {
    return `${environment.serverUrl}/`;
  }
}
