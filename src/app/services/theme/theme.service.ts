import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly renderer: Renderer2;

  // BehaviorSubject to hold the current theme state
  private readonly isDarkThemeSubject = new BehaviorSubject<boolean>(this.getStoredTheme());
  isDarkThemeStream$: Observable<boolean> = this.isDarkThemeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyInitialTheme();
  }
  /**
   * @konstantinosporo
   * @description Applies the saved theme preference or defaults to light theme.
   */
  private applyInitialTheme(): void {
    const isDark = this.isDarkThemeSubject.value;
    isDark ? this.setDark() : this.setLight();
  }
  /**
   * @konstantinosporo
   * @description Toggles the theme between dark and light and emits the new state.
   */
  toggleTheme(): void {
    const isDark = !this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(isDark);
    isDark ? this.setDark() : this.setLight();
  }
  /**
   * @konstantinosporo
   * @description Retrieves the saved theme from localStorage or defaults to light.
   * @returns boolean indicating if dark theme is stored
   */
  private getStoredTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
  /**
   * @konstantinosporo
   * @description Applies the dark theme by adding the 'dark' class and updating localStorage.
   */
  private setDark(): void {
    this.renderer.addClass(document.body, 'dark');
    localStorage.setItem('theme', 'dark');
  }
  /**
   * @konstantinosporo
   * @description Applies the light theme by removing the 'dark' class and updating localStorage.
   */
  private setLight(): void {
    this.renderer.removeClass(document.body, 'dark');
    localStorage.setItem('theme', 'light');
  }
}
