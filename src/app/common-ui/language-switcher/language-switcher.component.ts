import {Component} from '@angular/core';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslocoDirective],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang: string;
  languages: string[];

  constructor(private translocoService: TranslocoService) {
    this.currentLang = translocoService.getActiveLang();
    const availableLangs = translocoService.getAvailableLangs();
    if (Array.isArray(availableLangs) && typeof availableLangs[0] === 'string') {
      this.languages = availableLangs as string[];
    } else {
      this.languages = (availableLangs as { id: string; label: string }[]).map(lang => lang.id);
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const langCode = target.value;
    this.translocoService.setActiveLang(langCode);
    this.currentLang = langCode;
  }

}
