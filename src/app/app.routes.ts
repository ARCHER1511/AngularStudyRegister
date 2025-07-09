import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = 
[
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),title :'Login Page'},
    {path: 'register', loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent), title:'Register Page'},
    {path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),title :'Products Page',canActivate: [authGuard]},
    {path: 'jewelery',loadComponent:()=>import('./pages/jewelery/jewelery.component').then(m => m.JeweleryComponent),title : 'jewelery',canActivate: [authGuard]},
    {path: 'home',loadComponent:()=>import('./pages/home/home.component').then(m=>m.HomeComponent),title : 'home',canActivate : [authGuard]},
    {path: 'categories', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent), title: 'Categories',canActivate : [authGuard]},
    {path: 'product/:id',loadComponent:()=>import('./pages/details/details.component').then(m=>m.DetailsComponent),title:'details',canActivate : [authGuard]},
    {path:'address',loadComponent:()=>import('./pages/address-page/address-page.component').then(m=>m.AddressPageComponent),title:'address',canActivate : [authGuard]},
    {path:'**',redirectTo:'notfound', pathMatch:'full'},
    {path: 'notfound',loadComponent:()=>import('./pages/not-found/not-found.component').then(m=>m.NotFoundComponent),title :'notfound'}
];
