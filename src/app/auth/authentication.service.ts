/**
 *   @author Siddharth Kapania <sid.kapania@dal.ca>
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';

import { UserModel } from '@core/model/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const _jwtHelperService = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _isLoggedIn: BehaviorSubject<boolean>;
  private _isAdmin: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private _router: Router) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);
    this._isAdmin = new BehaviorSubject<boolean>(false);
  }

  login(user: UserModel) {
    console.log('User' + user);
    return this.http.post<any>(this._getUrl(), user);
  }

  logout() {
    this.clearLocalStorage();
    this.setIsLoggedIn(false);
    this.setIsAdmin(false);
    this._router.navigate(['/login']);
  }

  setIsLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  setIsAdmin(value: boolean): void {
    this._isAdmin.next(value);
  }

  get isAdmin(): Observable<boolean> {
    return this._isAdmin.asObservable();
  }

  getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  isTokenExpired(token: string): boolean {
    return _jwtHelperService.isTokenExpired(token);
  }

  decodeToken(token: string) {
    return _jwtHelperService.decodeToken(token);
  }

  appAuthAndRoleChecker(state: RouterStateSnapshot) {
    const token = this.authToken;
    const decodedToken = this.decodeToken(token);

    const routeDetails = this._router.config.find((routeConfig) => {
      // find a better condition
      return routeConfig.path.startsWith(state.url.split('/')[1]);
    });
    const isRouteGuarded = routeDetails && routeDetails?.canActivate != null;

    // If jwt key not exist or the value is blank, flush up the login state
    if (!token) {
      this.setIsLoggedIn(false);
      this.setIsAdmin(false);

      // If guarded route, traverse to login
      if (isRouteGuarded) {
        this._router.navigate(['/home']);
      }
      return false;
    }

    /**
     * Verifying authentication of routes:
     * If the token exist and it is not expired, check for route authorization based on user's role.s
     */
    if (token && !this.isTokenExpired(token)) {
      /**
       * Verifying authorization of routes
       * 1. If the user is admin or volunteer, they can access the protected routes that starts with `/admin`.
       * 2. If the user is student, they cannot access the protected routes staring with `/admin`
       * 3. If the user is not admin, volunteer, or student, Invalid user.
       *
       */
      if (decodedToken?.roleId === 1 || decodedToken?.roleId === 2) {
        this.setIsAdmin(true);
        if (state?.url && !state?.url.startsWith(`/admin`)) {
          // You are not authorized to access
          this._router.navigate(['/admin']);
          return false;
        }
      } else if (decodedToken?.roleId === 3) {
        this.setIsAdmin(false);

        if (state?.url && state.url?.startsWith(`/admin`)) {
          // You are not authorized to access
          this._router.navigate(['/home']);
          return false;
        }
      } else {
        // invalid role
        this.setIsAdmin(false);
        this._router.navigate(['/login']);
        return false;
      }

      this.setIsLoggedIn(true);
      return true;
    }

    this.clearLocalStorage();
    this.setIsLoggedIn(false);
    this.setIsAdmin(false);

    this._router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }

  // setter and getter to store JWT and user information in local storage
  set authToken(token: string) {
    localStorage.setItem('access_key', token);
  }

  get authToken() {
    return localStorage.getItem('access_key');
  }

  set authUserRole(roleId: number) {
    localStorage.setItem('role_id', String(roleId));
  }

  get authUserRole() {
    return Number(localStorage.getItem('role_id'));
  }

  set authUserEmail(email: string) {
    localStorage.setItem('email', email);
  }
  get authUserEmail() {
    return localStorage.getItem('email');
  }

  private _getUrl() {
    return `${environment.serverUrl}authenticate/`;
  }
}
