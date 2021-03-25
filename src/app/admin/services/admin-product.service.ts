import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  constructor(
    private _httpClient: HttpClient,
    private _globalErrorService: GlobalErrorService,
    private _storage: AngularFireStorage
  ) {}

  getAllProducts(params: any): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}`, { params })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  updateProductById(id: number, params: any): Observable<ApiResponseModel> {
    return this._httpClient
      .put<ApiResponseModel>(`${this._getUrl()}${id}`, params)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  deleteProductById(id: number) {
    return this._httpClient
      .delete<ApiResponseModel>(`${this._getUrl()}/${id}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }
  addProduct(params: any): Observable<ApiResponseModel> {
    return this._httpClient
      .post<ApiResponseModel>(`${this._getUrl()}`, params)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  getAllCategories(): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${environment.serverUrl}categories/`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  addCategory(params: any): Observable<ApiResponseModel> {
    return this._httpClient
      .post<ApiResponseModel>(`${environment.serverUrl}categories/`, params)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  updateCategoryById(id: number, params: any): Observable<ApiResponseModel> {
    return this._httpClient
      .put<ApiResponseModel>(`${environment.serverUrl}categories/${id}`, params)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  getProductDetails(id: string): Observable<ApiResponseModel> {
    return this._httpClient
      .get<ApiResponseModel>(`${this._getUrl()}/${id}`)
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  fetchProductImage(productId: number): Observable<string | null> {
    return this._storage
      .ref(`image/${productId}`)
      .getDownloadURL()
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  deleteImage(productId: number) {
    return this._storage.ref(`image/${productId}`).delete();
  }

  uploadImage(productId: number, imageFile: any) {
    return this._storage.ref(`image/${productId}`).put(imageFile);
  }

  private _getUrl() {
    return `${environment.serverUrl}products/`;
  }
}
