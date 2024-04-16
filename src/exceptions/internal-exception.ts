import { HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(messaage: string, errors: any, errorCode: number) {
        super(messaage, errorCode, 500, errors)
    }
}