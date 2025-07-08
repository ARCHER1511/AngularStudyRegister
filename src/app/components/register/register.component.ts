import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9+\\-\\s]{7,15}$')]
        ]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) return;

    const payload = this.registerForm.value;

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Account created successfully!';
        console.log('✅ Registered:', res);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('❌ Register failed:', err);
        this.errorMessage =
          err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  // Optional: shortcut for accessing controls in template
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
}

