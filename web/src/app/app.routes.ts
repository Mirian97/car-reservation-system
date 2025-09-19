import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { loginGuard } from './auth/guard/login.guard';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { FilterComponent } from './pages/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'cadastro', component: SignUpComponent, canActivate: [loginGuard] },
  {
    path: 'inicio/filtros',
    component: FilterComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'agendamentos', component: ReservationComponent },
      { path: 'perfil', component: ProfileComponent },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
