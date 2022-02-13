import { BaseException } from '../../../../Shared/Domain/Exception/BaseException';

export class InvestmentOrderAlreadyCompletedException extends BaseException {
    protected errorCode(): string {
        return 'INVESTMENT_ORDER_ALREADY_COMPLETED';
    }
}
