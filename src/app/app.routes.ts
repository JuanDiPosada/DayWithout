import { Routes } from '@angular/router';
import { PomodoroPage } from './modules/pomodoro/pages/pomodoro-page/pomodoro-page';
import { HabitsPage } from './modules/habits/pages/habits-page/habits-page';
import { GamesPage } from './modules/games/pages/games-page/games-page';

export const routes: Routes = [
    { path: 'pomodoro', component: PomodoroPage},
    { path: 'habits', component: HabitsPage},
    { path: 'games', component: GamesPage},  
];
