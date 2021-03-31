import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PickupService {
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };
  constructor(private _http: HttpClient) {}
  addRequest(data: any) {
    try {
      return this._http.post<any>(`${environment.serverUrl}donations/`, data);
    } catch (e) {
      throw new Error();
    }
  }
}
