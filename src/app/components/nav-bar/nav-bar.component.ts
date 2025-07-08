import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);

  Image: string = 'assets/logo.jpg';
  isLoggedIn = false;

  constructor() {
    if (this.isBrowser) {
      this._authService.isLoggedIn$.subscribe(status =>
        {
          this.isLoggedIn = status;
        });
    }
  }

  logout(): void {
    this._authService.logout();
    this.router.navigateByUrl('/login');
  }
}
