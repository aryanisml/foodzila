/**
 * Application error
 */
export class ApplicationError extends Error {

    errorCode: number;
    message: string;

    constructor(message: string, errorCode: number) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.name = ApplicationError.name;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
