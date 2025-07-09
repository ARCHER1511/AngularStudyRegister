import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);

  Image : string = "assets/logo.jpg"
  isLoggedIn = false;

  constructor()
  {
    if(this.isBrowser)
      {
        this._authService.isLoggedIn$.subscribe(status =>
        {
          this.isLoggedIn = status;
        });
      }
  }
}
