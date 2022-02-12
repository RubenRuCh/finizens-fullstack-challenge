import { BaseException } from "../../../../../Shared/Domain/Exception/BaseException";

export class InvestmentPortfolioNotFoundException extends BaseException {
    protected errorCode(): string {
        return 'INVESTMENT_PORTFOLIO_NOT_FOUND';
    }
}
