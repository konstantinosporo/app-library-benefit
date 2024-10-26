import { Injectable } from '@angular/core';
import { Modal, Toast } from 'bootstrap';

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

  private showModal(title: string, message: string, modalId: string, onSave?: () => void, buttonText?: string) {
    const modalTitle = document.getElementById(`${modalId}Title`)
    const modalBody = document.getElementById(`${modalId}Body`);
    const modalElement = document.getElementById(modalId);
    const saveButton = document.getElementById(`${modalId}Button`) as HTMLElement;

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalBody) {
      modalBody.textContent = message;
    }
    if (saveButton && buttonText) {
      saveButton.textContent = buttonText;
    }

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
      if (onSave && saveButton) {
        saveButton.onclick = () => {
          onSave();
          modal.hide();
        };
      }
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

  showVerificationModal(title: string, message: string, onSave?: () => void) {
    this.showModal(title, message, 'primaryModal', onSave);
  }

  showAddNewModal(title: string, message: string, onSave?: () => void, buttonText?: string) {
    this.showModal(title, message, 'successModal', onSave, buttonText);
  }
}
