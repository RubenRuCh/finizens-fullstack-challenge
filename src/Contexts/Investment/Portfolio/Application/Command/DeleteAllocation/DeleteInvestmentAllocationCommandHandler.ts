import { Command } from '../../../../../Shared/Domain/CQRS/Command/Command';
import { CommandHandler } from '../../../../../Shared/Domain/CQRS/Command/CommandHandler';
import { InvestmentAllocationId } from '../../../../Shared/Domain/ValueObject/InvestmentAllocationId';
import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { DeleteInvestmentAllocationCommand } from './DeleteInvestmentAllocationCommand';
import { InvestmentAllocationEraser } from './InvestmentAllocationEraser';

export class DeleteInvestmentAllocationCommandHandler implements CommandHandler<DeleteInvestmentAllocationCommand> {
    constructor(private allocationEraser: InvestmentAllocationEraser) {}

    subscribedTo(): Command {
        return DeleteInvestmentAllocationCommand;
    }

    async handle(command: DeleteInvestmentAllocationCommand): Promise<void> {
        const portfolioId = new InvestmentPortfolioId(command.portfolioId);
        const allocationId = new InvestmentAllocationId(command.allocationId);

        await this.allocationEraser.run({ portfolioId, allocationId });
    }
}
