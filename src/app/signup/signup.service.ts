/**
 * @author Samkit Shah <samkit@dal.ca>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { UserModel } from './../@core/model/user.model';
import { RoleModel } from './../@core/model/role.model';
import { MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private _roles = [
    {
      id: 3,
      name: 'Needy',
    },
  ];
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };
  constructor(private _http: HttpClient) {}

  getAllroles(): RoleModel[] {
    return this._roles;
  }

  // Send POST Request to the server
  addUser(user: UserModel) {
    try {
      return this._http.post<any>(`${environment.serverUrl}signup/`, user);
    } catch (e) {
      throw new Error();
    }
  }
}
