import { Command } from '../../../../../Shared/Domain/CQRS/Command/Command';
import { InvestmentAllocationDTO } from '../../../Domain/Model/Allocation/InvestmentAllocationDTO';
import { CreateInvestmentPortfolioRequest } from './CreateInvestmentPortfolioRequest';

export class CreateInvestmentPortfolioCommand extends Command {
    id: string;
    allocations: InvestmentAllocationDTO[];

    constructor({ id, allocations }: CreateInvestmentPortfolioRequest) {
        super();
        this.id = id;
        this.allocations = allocations;
    }
}
