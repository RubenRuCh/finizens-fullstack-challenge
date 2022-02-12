import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { DeleteInvestmentAllocationRequest } from "./DeleteInvestmentAllocationRequest";

export class DeleteInvestmentAllocationCommand extends Command {
    portfolioId: string;
    allocationId: string;

    constructor({ portfolioId, allocationId }: DeleteInvestmentAllocationRequest) {
        super();
        this.portfolioId = portfolioId;
        this.allocationId = allocationId;
    }
}
