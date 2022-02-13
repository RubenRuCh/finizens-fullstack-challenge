import { Command } from "../../../../../Shared/Domain/CQRS/Command/Command";
import { CommandHandler } from "../../../../../Shared/Domain/CQRS/Command/CommandHandler";
import { InvestmentOrderId } from "../../../Domain/ValueObject/InvestmentOrderId";
import { CompleteInvestmentOrderCommand } from "./CompleteInvestmentOrderCommand";
import { InvestmentOrderCompleter } from "./InvestmentOrderCompleter";

export class CompleteInvestmentOrderCommandHandler implements CommandHandler<CompleteInvestmentOrderCommand> {
    constructor(private orderCompleter: InvestmentOrderCompleter) {}

    subscribedTo(): Command {
        return CompleteInvestmentOrderCommand;
    }

    async handle(command: CompleteInvestmentOrderCommand): Promise<void> {
        const id = new InvestmentOrderId(command.id);
       
        await this.orderCompleter.run({ id });
    }
}
