import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = 
[
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),title :'Login Page'},
    {path: 'register', loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent), title:'Register Page'},
    {path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),title :'Products Page',canActivate: [authGuard]
}
];
