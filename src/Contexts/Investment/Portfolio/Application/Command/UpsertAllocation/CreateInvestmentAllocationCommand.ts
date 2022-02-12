import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CreateInvestmentAllocationRequest } from "./CreateInvestmentAllocationRequest";

export class CreateInvestmentAllocationCommand extends Command {
    portfolioId: string;
    allocationId: string;
    shares: number;

    constructor({ portfolioId, allocationId, shares }: CreateInvestmentAllocationRequest) {
        super();
        this.portfolioId = portfolioId;
        this.allocationId = allocationId;
        this.shares = shares;
    }
}
