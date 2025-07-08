import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  if (token) {
    return true;
  }

  return router.parseUrl('/login');
};

