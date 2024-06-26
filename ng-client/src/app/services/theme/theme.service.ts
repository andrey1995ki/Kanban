import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ThemeScheme} from "./theme.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = this.cookieService.get('Theme') as ThemeScheme | undefined
  private prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  private scheme: ThemeScheme = this.prefersDarkScheme ? "light-theme" : "dark-theme"
  isDarkTheme = this.prefersDarkScheme
  theme$ = new BehaviorSubject(this.currentTheme || this.scheme)

  constructor(private cookieService: CookieService) {
  }

  setTheme(): void {
    if (this.currentTheme) {
      this.changeTheme(this.currentTheme)
      if (this.currentTheme === 'light-theme') {
        this.isDarkTheme = false
      }
    }
  }

  private changeTheme(theme: ThemeScheme) {
    document.body.classList.toggle(theme);
  }

  toggleTheme(isDarkTheme: boolean) {
    const selectScheme: ThemeScheme = isDarkTheme ? "dark-theme" : "light-theme"
    this.theme$.next(selectScheme)
    this.cookieService.set('Theme', selectScheme, { expires: 200, path: '/'});
    this.changeTheme(this.scheme)
  }

}
