import { InvestmentOrderTypeValue } from '../../../Domain/ValueObject/InvestmentOrderType';

export type CreateInvestmentOrderRequest = {
    id: string;
    portfolio: string;
    allocation: string;
    shares: number;
    type: InvestmentOrderTypeValue;
};
