import { BaseException } from '../../../../Shared/Domain/Exception/BaseException';

export class InvestmentOrderNotFoundException extends BaseException {
    protected errorCode(): string {
        return 'INVESTMENT_ORDER_NOT_FOUND';
    }
}
