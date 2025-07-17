import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { RegisterRequest } from '../../interfaces/RegisterRequest';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private Url = 'https://localhost:7230/api/Authentication';

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private _platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this._platformId);

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private hasToken(): boolean {
    if (this.isBrowser && typeof sessionStorage != 'undefined') {
      return !!(sessionStorage.getItem('token') || localStorage.getItem('token'));
    }
    return false;
  }
  // Helper method to convert an object to HttpParams
  private createHttpParams(data: any): HttpParams {
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
    return params;
  }

  login(data: LoginRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = this.createHttpParams(data); // Convert data to HttpParams

    return this._httpClient.post(`${this.Url}/login`, data);
  }

  register(data: RegisterRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = this.createHttpParams(data); // Convert data to HttpParams

    return this._httpClient.post(`${this.Url}/register`,data);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
    this._isLoggedIn$.next(false);
    this._router.navigate(['/login']);
  }

  markAsLoggedIn(): void {
    this._isLoggedIn$.next(true);
  }
}

