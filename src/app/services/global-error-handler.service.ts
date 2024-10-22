import { ErrorHandler, Injectable } from "@angular/core";
import { Toast } from 'bootstrap';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  /**
   * @konstantinosporo
   * @description
   * Implementing the ErrorHandler interface of Angular.
   * The root of every error starts from this interface.
   * So i made my own implementation of ErrorHandler,
   * which has the following method handleError().
   * Inside this method i catch EVERY thrown error of this app.
   * No need to catch them one by one!
   * I could also inject http to send the logs in my db or anything!
   * @param error 
   */  
  handleError(error: any): void {
    // Get the global-error components toast body div id
    const errorToastBody = document.getElementById('errorToastBody');
    // Make the content of the toast equal to the current error
    if (errorToastBody) {
      errorToastBody.textContent = error.message || 'Unexpected error occured.' 
    }
    // Get the toast div 
    const toastElement = document.getElementById('errorToast');
    // Throw the error using the Toasts show() method.
    if (toastElement) {
      const errorToast = new Toast(toastElement); 
      errorToast.show(); 
    }

  }
}