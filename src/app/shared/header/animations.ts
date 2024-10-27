import {
  animate,
  animation,
  keyframes,
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

// =========================
// Bounce in
// =========================
export const bounceIn = animation([
  style({ transform: 'scale(0)', opacity: 0 }), // Start with scale 0 and opacity 0
  animate('{{time}}', keyframes([
    style({ transform: 'scale(0.3)', opacity: 1, offset: 0.3 }), // Small scale
    style({ transform: 'scale(1.1)', opacity: 1, offset: 0.7 }), // Slightly larger
    style({ transform: 'scale(1)', opacity: 1, offset: 1 }), // Normal scale
  ]))
]);

// =========================
// Bounce out
// =========================
export const bounceOut = animation([
  animate('{{time}}', keyframes([
    style({ transform: 'scale(1)', opacity: 1, offset: 0 }), // Start at normal scale
    style({ transform: 'scale(1.1)', opacity: 1, offset: 0.5 }), // Slightly larger
    style({ transform: 'scale(0)', opacity: 0, offset: 1 }), // Scale to 0
  ]))
]);

// =========================
// Slide in with Bounce and Fade
// =========================
export const slideInBounceFade = animation([
  style({ transform: 'translateY(-30px)', opacity: 0 }), // Start above the final position and invisible
  animate('{{time}}', keyframes([
    style({ transform: 'translateY(0)', opacity: 1, offset: 0.3 }), // End position with fade in
    style({ transform: 'translateY(10px)', opacity: 1, offset: 0.6 }), // Bounce effect
    style({ transform: 'translateY(0)', opacity: 1, offset: 1 }), // Final position
  ]))
]);

// =========================
// Slide out with Bounce and Fade
// =========================
export const slideOutBounceFade = animation([
  animate('{{time}}', keyframes([
    style({ transform: 'translateY(0)', opacity: 1, offset: 0 }), // Start at final position
    style({ transform: 'translateY(10px)', opacity: 1, offset: 0.5 }), // Bounce effect
    style({ transform: 'translateY(-30px)', opacity: 0, offset: 1 }), // Slide up and disappear
  ]))
]);