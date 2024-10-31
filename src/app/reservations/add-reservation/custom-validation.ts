import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const today = new Date();
    const selectedDate = new Date(control.value);

    // Check if the selected date is before today
    const isValid = selectedDate > today;

    return isValid ? null : { futureDate: { valid: false } };
  };
}
