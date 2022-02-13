import { Command } from '../../../../../Shared/Domain/CQRS/Command/Command';
import { CreateInvestmentOrderRequest } from './CreateInvestmentOrderRequest';
import { InvestmentOrderTypeValue } from '../../../Domain/ValueObject/InvestmentOrderType';

export class CreateInvestmentOrderCommand extends Command {
    id: string;
    portfolioId: string;
    allocationId: string;
    shares: number;
    type: InvestmentOrderTypeValue;

    constructor({ id, portfolio, allocation, shares, type }: CreateInvestmentOrderRequest) {
        super();
        this.id = id;
        this.portfolioId = portfolio;
        this.allocationId = allocation;
        this.shares = shares;
        this.type = type;
    }
}
