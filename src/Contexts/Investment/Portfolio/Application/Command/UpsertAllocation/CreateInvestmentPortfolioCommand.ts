import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { InvestmentAllocationDTO } from "../../../Domain/Model/Allocation/InvestmentAllocationDTO";
import { InvestmentPortfolioDTO } from "../../../Domain/Model/Portfolio/InvestmentPortfolioDTO";

type Params = InvestmentPortfolioDTO;

export class CreateInvestmentPortfolioCommand extends Command {
    id: string;
    allocations: InvestmentAllocationDTO[];

    constructor({ id, allocations }: Params) {
        super();
        this.id = id;
        this.allocations = allocations;
    }
}
