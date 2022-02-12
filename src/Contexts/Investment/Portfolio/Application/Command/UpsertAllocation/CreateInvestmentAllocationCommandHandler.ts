import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CommandHandler } from "../../../../../Shared/Domain/CQRS/Command/CommandHandler";
import { InvestmentAllocationId } from "../../../../Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentPortfolioId } from "../../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentShares } from "../../../../Shared/Domain/ValueObject/InvestmentShares";
import { CreateInvestmentAllocationCommand } from "./CreateInvestmentAllocationCommand";
import { InvestmentAllocationCreator } from "./InvestmentAllocationCreator";


export class CreateInvestmentAllocationCommandHandler implements CommandHandler<CreateInvestmentAllocationCommand> {
    constructor(private portfolioCreator: InvestmentAllocationCreator) {}

    subscribedTo(): Command {
        return CreateInvestmentAllocationCommand;
    }

    async handle(command: CreateInvestmentAllocationCommand): Promise<void> {
        const portfolioId = new InvestmentPortfolioId(command.portfolioId);
        const allocationId = new InvestmentAllocationId(command.allocationId);
        const shares = new InvestmentShares(command.shares);
        
        await this.portfolioCreator.run({ portfolioId, allocationId, shares });
    }
}
