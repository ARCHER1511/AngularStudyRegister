import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);

        // ✅ Flexible access: supports both structures
        const token = res?.token || res?.data?.token;
       

        if (!token) {
          this.errorMessage = 'Login failed: no token received.';
          return;
        }

        if (this.loginForm.value.rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        this.authService.markAsLoggedIn(); // 🔔 Trigger app-wide state change
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed:', err);
      }
    });
  }
}

