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
   * Toggles the theme between dark and light and emits the new state.
   */
  toggleTheme(): void {
    const isDark = !this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(isDark);
    this.updateTheme(isDark);
  }

  /**
   * Applies the saved theme preference or defaults to light theme.
   */
  private applyInitialTheme(): void {
    const isDark = this.isDarkThemeSubject.value;
    this.updateTheme(isDark);
  }

  /**
   * Updates the theme in the DOM and localStorage.
   * @param isDark Whether the theme should be dark
   */
  private updateTheme(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }

  /**
   * Retrieves the saved theme from localStorage or defaults to light.
   */
  private getStoredTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
}
