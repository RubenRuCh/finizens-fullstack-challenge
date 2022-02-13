import { BaseException } from '../../../../../Shared/Domain/Exception/BaseException';

export class InvestmentAllocationNotFoundException extends BaseException {
    protected errorCode(): string {
        return 'INVESTMENT_ALLOCATION_NOT_FOUND';
    }
}
