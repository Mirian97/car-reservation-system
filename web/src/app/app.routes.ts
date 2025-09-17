import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { loginGuard } from './auth/guard/login.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'cadastro', component: SignUpComponent, canActivate: [loginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
