import { Routes } from "@angular/router";
import { LoginComponent, ProfilComponent, RegisterComponent } from "./pages";

export const USER_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profil', component: ProfilComponent }
]