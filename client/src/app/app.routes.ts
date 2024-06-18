import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { LoginPage } from './components/login-page/login-page.component';
import { isAuthentified, isNotAuthentified } from './guards/Auth.guard';
import { WebcamPage } from './components/webcam-page/webcam-page.component';
import { isDesktop } from './guards/Device.guard';
import { ResultPage } from './components/result-page/result-page.component';
import { hasDisplayableStats, isAwaitingFeedback } from './guards/Result.guard';
import { HistoryPage } from './components/history-page/history-page.component';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatsResultPage } from './components/result-page/stats/stats-result-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [isNotAuthentified]},
    { path: 'scan', component: WebcamPage, canActivate: [isDesktop]},
    { path: 'result', component: ResultPage, canActivate: [isAwaitingFeedback]},
    { path: 'result/stats', component: StatsResultPage, canActivate: [hasDisplayableStats]},
    { path: 'history', component: HistoryPage, canActivate: [isAuthentified]},
    { path: 'statistics', component: StatisticsPage, canActivate: [isAuthentified]},
    { path: '', component: HomePage },
];
