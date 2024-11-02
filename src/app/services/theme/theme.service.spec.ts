import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    // Spy on localStorage.getItem to return 'dark' theme
    spyOn(localStorage, 'getItem').and.returnValue('dark');
    spyOn(localStorage, 'setItem');

    // Spy on Renderer2 methods
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);

    // Provide RendererFactory2 that returns our renderer spy
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: RendererFactory2, useValue: { createRenderer: () => rendererSpy } }
      ],
    });

    service = TestBed.inject(ThemeService);
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null) as jasmine.SpyObj<Renderer2>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply the initial theme based on localStorage', () => {
    service.applyInitialTheme();

    expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'dark');
    expect(renderer.removeClass).not.toHaveBeenCalled();
  });

  it('should set the theme to dark', () => {
    service.setDark();

    expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should set the theme to light and remove the dark class', () => {
    service.setLight();

    expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should retrieve the stored theme from localStorage', () => {
    const theme = service.getStoredTheme();
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(theme).toBeTrue();
  });

  it('should toggle the theme correctly between dark and light', () => {
    // Initial toggle from dark to light
    service.toggleTheme(); // Dark -> Light
    expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');

    // Second toggle from light back to dark
    service.toggleTheme(); // Light -> Dark
    expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
