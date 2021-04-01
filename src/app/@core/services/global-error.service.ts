/**
 *
 *
 * Global http response error handler service
 * Inspired By: https://www.udemy.com/course/the-complete-angular-master-class/
 */

import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from '@shared/navigation.service';
import { AppError } from '@app/@shared/errors/app-error';
import { NotFoundError } from '@app/@shared/errors/not-found-error';
import { BadRequestError } from '@app/@shared/errors/bad-request-error';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {
  constructor(private _navigationService: NavigationService) {}

  handleHttepResponseError(err: HttpErrorResponse) {
    if (err.status === 404) {
      return throwError(new NotFoundError(err));
    } else if (err.status === 400) {
      return throwError(new BadRequestError(err));
    }
    return throwError(new AppError(err));
  }

  reactToAppError(err: AppError | NotFoundError | BadRequestError) {
    if (err instanceof NotFoundError) {
      this._navigationService.navigateTo404();
    }
    // Todo: redirect to appropriate pages 400, 500 or App error
  }
}
