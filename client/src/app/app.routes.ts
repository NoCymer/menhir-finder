import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { LoginPage } from './components/login-page/login-page.component';
import { isNotAuthentified } from './guards/Auth.guard';
import { WebcamPage } from './components/webcam-page/webcam-page.component';
import { isDesktop } from './guards/Device.guard';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [isNotAuthentified]},
    { path: 'scan', component: WebcamPage, canActivate: [isDesktop]},
    { path: 'result', component: WebcamPage},
    { path: '', component: HomePage },
];
