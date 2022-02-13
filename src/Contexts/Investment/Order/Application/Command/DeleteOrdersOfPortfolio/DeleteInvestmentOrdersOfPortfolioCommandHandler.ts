import { InvestmentPortfolioId } from './../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CommandHandler } from "../../../../../Shared/Domain/CQRS/Command/CommandHandler";
import { DeleteInvestmentOrdersOfPortfolioCommand } from "./DeleteInvestmentOrdersOfPortfolioCommand";
import { InvestmentOrdersOfPortfolioEraser } from "./InvestmentOrdersOfPortfolioEraser";

export class DeleteInvestmentOrdersOfPortfolioCommandHandler implements CommandHandler<DeleteInvestmentOrdersOfPortfolioCommand> {
    constructor(private ordersEraser: InvestmentOrdersOfPortfolioEraser) {}

    subscribedTo(): Command {
        return DeleteInvestmentOrdersOfPortfolioCommand;
    }

    async handle(command: DeleteInvestmentOrdersOfPortfolioCommand): Promise<void> {
        const portfolioId = new InvestmentPortfolioId(command.portfolioId);
       
        await this.ordersEraser.run({ portfolioId });
    }
}
