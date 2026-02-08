import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
})
export class LanguageSelector implements OnInit {
  languages: Language[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  currentLanguage: Language = this.languages[0];
  isOpen = false;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    try {
      // Get saved language or detect browser language
      const savedLang = localStorage.getItem('dayWithout_language');
      const browserLang = this.translate.getBrowserLang();

      let langCode = savedLang || browserLang || 'es';

      // Ensure we support the language
      if (!['es', 'en', 'pt'].includes(langCode)) {
        langCode = 'es';
      }

      this.setLanguage(langCode);
    } catch (error) {
      console.error('Error initializing language selector:', error);
      this.setLanguage('es');
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language): void {
    this.setLanguage(lang.code);
    this.isOpen = false;
  }

  private setLanguage(code: string): void {
    this.translate.use(code);
    this.currentLanguage =
      this.languages.find((l) => l.code === code) || this.languages[0];
    localStorage.setItem('dayWithout_language', code);
  }

  // Close dropdown when clicking outside
  onClickOutside(): void {
    this.isOpen = false;
  }
}
