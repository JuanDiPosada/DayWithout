import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './info-page.html',
  styleUrl: './info-page.css',
})
export class InfoPage implements OnInit {
  deferredPrompt: any;
  showInstallButton = false;

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.showInstallButton = true;
    });

    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      this.showInstallButton = false;
      this.deferredPrompt = null;
    });
  }

  async installPwa() {
    if (!this.deferredPrompt) {
      return;
    }
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await this.deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    this.deferredPrompt = null;
    this.showInstallButton = false;
  }
}
