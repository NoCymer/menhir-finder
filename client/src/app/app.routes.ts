import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { LoginPage } from './components/login-page/login-page.component';
import { isAuthentified, isNotAuthentified } from './guards/Auth.guard';
import { WebcamPage } from './components/webcam-page/webcam-page.component';
import { isDesktop } from './guards/Device.guard';
import { ResultPage } from './components/result-page/result-page.component';
import { isAwaitingFeedback } from './guards/Result.guard';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [isNotAuthentified]},
    { path: 'scan', component: WebcamPage, canActivate: [isDesktop]},
    { path: 'result', component: ResultPage, canActivate: [isAwaitingFeedback]},
    { path: 'history', component: WebcamPage, canActivate: [isAuthentified]},
    { path: 'statistics', component: WebcamPage, canActivate: [isAuthentified]},
    { path: '', component: HomePage },
];
