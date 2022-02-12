import { BaseException } from "../../../../Shared/Domain/Exception/BaseException";

export class InvalidSharesException extends BaseException {
    protected errorCode(): string {
        return 'INVALID_SHARES';
    }
}
