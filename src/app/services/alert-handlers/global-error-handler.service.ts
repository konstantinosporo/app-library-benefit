import { ErrorHandler, Injectable } from "@angular/core";
import { AlertService } from "./alert.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly alertService: AlertService) { }
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
    this.alertService.showError(error.message);
  }
}