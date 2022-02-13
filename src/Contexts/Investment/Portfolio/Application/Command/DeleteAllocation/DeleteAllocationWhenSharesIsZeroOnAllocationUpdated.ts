import { DomainEventClass } from "../../../../../Shared/Domain/Event/DomainEvent";
import { DomainEventSubscriber } from "../../../../../Shared/Domain/Event/DomainEventSubscriber";
import { InvestmentShares } from "../../../../Shared/Domain/ValueObject/InvestmentShares";
import { InvestmentAllocationUpdated } from "../../../Domain/Event/Allocation/InvestmentAllocationUpdated";
import { DeleteInvestmentAllocationCommand } from "./DeleteInvestmentAllocationCommand";
import { DeleteInvestmentAllocationCommandHandler } from "./DeleteInvestmentAllocationCommandHandler";
import { DeleteInvestmentAllocationRequest } from "./DeleteInvestmentAllocationRequest";
import { InvestmentAllocationEraser } from "./InvestmentAllocationEraser";

export class DeleteAllocationWhenSharesIsZeroOnAllocationUpdated implements DomainEventSubscriber<InvestmentAllocationUpdated> {
  
  private handler: DeleteInvestmentAllocationCommandHandler;

  constructor(private allocationEraser: InvestmentAllocationEraser) {
    this.handler = new DeleteInvestmentAllocationCommandHandler(this.allocationEraser);
  }

  subscribedTo(): DomainEventClass[] {
    return [InvestmentAllocationUpdated];
  }

  async on(domainEvent: InvestmentAllocationUpdated): Promise<void> {
    const { aggregateId, allocation} = domainEvent;

    const shares = new InvestmentShares(allocation.shares);

    if (!shares.areEmpty) {
      return;
    }

    const request: DeleteInvestmentAllocationRequest = {
      portfolioId: aggregateId,
      allocationId: allocation.id,
    };

    const command = new DeleteInvestmentAllocationCommand(request);

    this.handler.handle(command)
  }
}
  