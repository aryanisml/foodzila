import { ErrorHandler, Injectable } from '@angular/core';
import { ApplicationError } from './application-error';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler extends ErrorHandler {
    constructor() {
        super();
    }
    public handleError(error): void {
        //  let errorMsg = null;
        let errorCode = null;
        if (error instanceof ApplicationError) {
            errorCode = error.errorCode;
        } else if (error.rejection instanceof ApplicationError) {
            errorCode = error.rejection.errorCode;
        } else {
            super.handleError(error);
        }
    }
}
