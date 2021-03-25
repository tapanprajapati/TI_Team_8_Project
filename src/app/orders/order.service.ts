import { environment } from './../../environments/environment.prod';
import { OrderDetailModel } from './../@core/model/order.model';
import { Observable } from 'rxjs';
import { OrderModel } from '@core/model/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError } from 'rxjs/operators';
import { GlobalErrorService } from '@core/services/global-error.service';
import { AuthenticationService } from '@app/auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: OrderModel[];
  private _globalErrorService: GlobalErrorService;
  private _storage: AngularFireStorage;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this._getUrl() + 'user/' + this.authenticationService.authUserEmail);
  }
  getOrderDetails(orderId: number) {
    return this.http.get<OrderDetailModel[]>(this._getUrl() + orderId);
  }
  private _getUrl() {
    return `${environment.serverUrl}orders/`;
  }
}
