import { Routes } from '@angular/router';
import { LoginComponent, ProfilComponent, RegisterComponent } from './pages';
import { authGuard } from '@shared/guard/auth.guard';

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [authGuard],
    },

]