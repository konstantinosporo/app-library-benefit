import { Injectable } from '@angular/core';
import { Modal, Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /**
   * @konstantinosporo
   * @description
   * Method that triggers the bootstrap toast. Can dynamically set the context of its body.
   */
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
  /**
  * @konstantinosporo
  * @description
  * Method that triggers the bootstrap modal. Can dynamically set the context of its body, title 
  * and button. It also has an arrow function as a param that handles the scenario where the user accepts the action.
  */
  private showModal(title: string, message: string, modalId: string, onSave?: () => void, buttonText?: string) {
    const modalTitle = document.getElementById(`${modalId}Title`)
    const modalBody = document.getElementById(`${modalId}Body`);
    const saveButton = document.getElementById(`${modalId}Button`) as HTMLElement;
    const modalElement = document.getElementById(modalId);

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalBody) {
      modalBody.textContent = message;
    }
    if (saveButton && buttonText) {
      saveButton.textContent = buttonText;
    }
    // Callback function that gets executed if the user saves
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
  /**
   * @konstantinosporo
   * Shows green toast. Sets the content of the toast.
   */
  showSuccessToast(message: string) {
    this.showToast(message, 'successToast');
  }
  /**
   * @konstantinosporo
   * Shows red toast. Sets the content of the toast.
   */
  showDangerToast(message: string) {
    this.showToast(message, 'dangerToast');
  }
  /**
   * @konstantinosporo
   * Shows light aqua cyan toast. Sets the content of the toast. 
   */
  showInfoToast(message: string) {
    this.showToast(message, 'infoToast');
  }
  /**
   * @konstantinosporo
   * Shows a green modal. Sets the title, message, button text and the action of the confirmation.
   */
  showSuccessModal(title: string, message: string, onSave?: () => void, buttonText?: string) {
    this.showModal(title, message, 'successModal', onSave, buttonText);
  }
  /**
   * @konstantinosporo
   * Shows a danger modal. Sets the title, message, button text and the action of the confirmation.
   */
  showDangerModal(title: string, message: string, onSave?: () => void, buttonText?: string) {
    this.showModal(title, message, 'dangerModal', onSave, buttonText);
  }
  /**
   * @konstantinosporo
   * Shows a danger modal. Sets the title, message, button text and the action of the confirmation.
   */
  showInfoModal(title: string, message: string, onSave?: () => void, buttonText?: string) {
    this.showModal(title, message, 'infoModal', onSave, buttonText);
  }
}
