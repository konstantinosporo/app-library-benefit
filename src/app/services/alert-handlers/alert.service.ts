import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private showToast(message: string, toastId: string) {
    const toastBody = document.getElementById(`${toastId}Body`);
    const toastElement = document.getElementById(toastId);

    if (toastBody) {
      toastBody.textContent = message;
    }

    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

   showSuccess(message: string) {
    this.showToast(message, 'successToast');
  }

  showError(message: string) {
    this.showToast(message, 'errorToast');
  }

  showInfo(message: string) {
    this.showToast(message, 'infoToast');
  }
}
