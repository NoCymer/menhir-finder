import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { LoginPage } from './components/login-page/login-page.component';
import { isAuthentified, isNotAuthentified } from './guards/Auth.guard';
import { WebcamPage } from './components/webcam-page/webcam-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [isNotAuthentified]},
    { path: 'scan', component: WebcamPage, canActivate: [isNotAuthentified]},
    { path: '', component: HomePage },
];
