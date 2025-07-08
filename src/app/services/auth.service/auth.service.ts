import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    if (this.isBrowser) {
      return !!(sessionStorage.getItem('token') || localStorage.getItem('token'));
    }
    return false;
  }

  login(data: any) {
    return this._httpClient.post(`${this.Url}/login`, data);
  }

  register(data: any) {
    return this._httpClient.post(`${this.Url}/register`, data);
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

