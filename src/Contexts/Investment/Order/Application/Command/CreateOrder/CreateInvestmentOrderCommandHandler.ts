import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CommandHandler } from "../../../../../Shared/Domain/CQRS/Command/CommandHandler";
import { InvestmentAllocationId } from "../../../../Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentPortfolioId } from "../../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentShares } from "../../../../Shared/Domain/ValueObject/InvestmentShares";
import { InvestmentOrderId } from "../../../Domain/ValueObject/InvestmentOrderId";
import { InvestmentOrderType } from "../../../Domain/ValueObject/InvestmentOrderType";
import { CreateInvestmentOrderCommand } from "./CreateInvestmentOrderCommand";
import { InvestmentOrderCreator } from "./InvestmentOrderCreator";

export class CreateInvestmentOrderCommandHandler implements CommandHandler<CreateInvestmentOrderCommand> {
    constructor(private orderCreator: InvestmentOrderCreator) {}

    subscribedTo(): Command {
        return CreateInvestmentOrderCommand;
    }

    async handle(command: CreateInvestmentOrderCommand): Promise<void> {
        const id = new InvestmentOrderId(command.id);
        const portfolioId = new InvestmentPortfolioId(command.portfolioId);
        const allocationId = new InvestmentAllocationId(command.allocationId);
        const shares = new InvestmentShares(command.shares);
        const type = new InvestmentOrderType(command.type);
       
        await this.orderCreator.run({ id, portfolioId, allocationId, shares, type });
    }
}
