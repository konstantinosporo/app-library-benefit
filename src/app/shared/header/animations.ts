import {
  animate,
  animation,
  style
} from "@angular/animations";

// =========================
// Fade in
// =========================
export const fadeIn = animation([
  style({ opacity: 0 }),
  animate('{{time}}', style({ opacity: 1 }))
]);

// =========================
// Fade out
// =========================
export const fadeOut = animation([
  animate('{{time}}', style({ opacity: 0 }))
]);
