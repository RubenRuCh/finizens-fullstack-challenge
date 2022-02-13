import { BaseException } from "../../../../Shared/Domain/Exception/BaseException";

export class InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException extends BaseException {
    protected errorCode(): string {
        return 'INVESTMENT_ORDER_CANNOT_SELL_MORE_SHARES_THAN_AVAILABLE_IN_ALLOCATION';
    }
}
