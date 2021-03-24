/**
 * @author Samkit Shah <samkit@dal.ca>
 */
 import { Injectable, OnDestroy } from '@angular/core';
 import { UserModel } from '../@core/model/user.model';
 import { RoleModel } from '../@core/model/role.model';
 import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { environment } from '@env/environment';
 import { ProductModel } from '@core/model/product.model';
 import { AuthenticationService } from '@app/auth';
 import { GlobalErrorService } from '@app/@core/services/global-error.service';
 import { Router } from '@angular/router';
 import { Observable } from 'rxjs';
 import { ApiResponseModel } from '@app/@core/model/api-response.model';
 import { catchError } from 'rxjs/operators';
 import { OrderModel } from '@app/@core/model/order.model';
 
 @Injectable({ providedIn: 'root' })
 export class CheckoutService {
   private _cartItems: ProductModel[] = [];
   private _isLoggedIn: boolean;
   private _matDialogConfig: MatDialogConfig = {
     minWidth: '250px',
     minHeight: '200px',
   };
 
   constructor(
     private _authenticationService: AuthenticationService,
     private _matDialog: MatDialog,
     private _router: Router,
     private _http: HttpClient,
     private _globalErrorService: GlobalErrorService
   ) {}
 
   // This function will send POST request to the server
   createOrder(order: OrderModel) {
     try {
       return this._http.post<any>(
         `${environment.serverUrl}` + 'checkout/' + this._authenticationService.authUserEmail,
         order
       );
     } catch (e) {
       throw new Error();
     }
   }
 
   getCartProducts(): Observable<ApiResponseModel> {
     return this._http
       .get<ApiResponseModel>(this._getCartUrl(), { headers: this._getAuthorizationHeader() })
       .pipe(catchError(this._globalErrorService.handleHttepResponseError));
   }
 
   deleteProductFromCart(productId: number): Observable<ApiResponseModel> {
     return this._http
       .delete<ApiResponseModel>(`${this._getCartUrl()}/${productId}`, { headers: this._getAuthorizationHeader() })
       .pipe(catchError(this._globalErrorService.handleHttepResponseError));
   }
 
   private _getCartUrl() {
     return `${environment.serverUrl}cart`;
   }
 
   private _getAuthorizationHeader(): HttpHeaders {
     return new HttpHeaders({
       Authorization:
         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYW5uZXJJZCI6IkIwMDg1MzkxMyIsInJvbGVJZCI6MywiaWF0IjoxNTk1NDAxOTQ4LCJleHAiOjE1OTU0MDU1NDh9.IvFTPFc8K8sYrxuoUwvsmoXDyQkTn8cQM36A5g5oe7c',
     });
   }
 }
 