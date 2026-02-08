import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  navItems = [
    { path: '/pomodoro', labelKey: 'nav.pomodoro' },
    { path: '/habits', labelKey: 'nav.habits' },
    { path: '/games', labelKey: 'nav.games' },
  ];
}
