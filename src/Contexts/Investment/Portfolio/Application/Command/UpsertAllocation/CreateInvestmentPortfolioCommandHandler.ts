import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CommandHandler } from "../../../../../Shared/Domain/CQRS/Command/CommandHandler";
import { InvestmentPortfolioId } from "../../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocation } from "../../../Domain/Model/Allocation/InvestmentAllocation";
import { CreateInvestmentPortfolioCommand } from "./CreateInvestmentPortfolioCommand";
import { InvestmentPortfolioCreator } from "./InvestmentPortfolioCreator";


export class CreateInvestmentPortfolioCommandHandler implements CommandHandler<CreateInvestmentPortfolioCommand> {
    constructor(private portfolioCreator: InvestmentPortfolioCreator) {}

    subscribedTo(): Command {
        return CreateInvestmentPortfolioCommand;
    }

    async handle(command: CreateInvestmentPortfolioCommand): Promise<void> {
        const portfolioId = new InvestmentPortfolioId(command.id);
        const allocations = command.allocations.map(allocationDTO => InvestmentAllocation.fromDTO(allocationDTO))
        
        await this.portfolioCreator.run({ id: portfolioId, allocations });
    }
}
