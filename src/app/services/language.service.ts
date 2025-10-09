import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private readonly storageKey = 'preferredLang';

  private lang$ = new BehaviorSubject<'EN' | 'DE'>(
    (localStorage.getItem(this.storageKey) as 'EN' | 'DE') || 'EN'
  );

  get currentLang() {
    return this.lang$.asObservable();
  }

  setLang(lang: 'EN' | 'DE') {
    localStorage.setItem(this.storageKey, lang);
    this.lang$.next(lang);
  }
}