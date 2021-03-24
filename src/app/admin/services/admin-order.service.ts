import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  constructor(private _httpClient: HttpClient, private _globalErrorService: GlobalErrorService) {}

  getAllOrders(): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  getOrderDetails(orderId: number): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}/${orderId}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  setOrderStatus(orderId: number, status: string): Observable<ApiResponseModel> {
    return this._httpClient
      .put<ApiResponseModel>(`${this._getUrl()}/${orderId}`, { status: status })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  setOrderDelivered(orderId: number): Observable<ApiResponseModel> {
    return this._httpClient
      .put<ApiResponseModel>(`${this._getUrl()}/setDelivered/${orderId}`, {})
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  private _getUrl() {
    return `${environment.serverUrl}orders/`;
  }
}
