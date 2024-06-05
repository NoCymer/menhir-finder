import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { LoginPage } from './components/login-page/login-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPage },
    { path: '', component: HomePage },
];
