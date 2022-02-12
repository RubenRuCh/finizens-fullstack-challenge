import { DomainEventClass } from "../../../../../Shared/Domain/Event/DomainEvent";
import { DomainEventSubscriber } from "../../../../../Shared/Domain/Event/DomainEventSubscriber";
import { InvestmentAllocationId } from "../../../../Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentPortfolioId } from "../../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocationUpdated } from "../../../Domain/Event/Allocation/InvestmentAllocationUpdated";
import { InvestmentAllocationEraser } from "./InvestmentAllocationEraser";

export class DeleteAllocationWhenSharesIsZeroOnAllocationUpdated implements DomainEventSubscriber<InvestmentAllocationUpdated> {
    constructor(private allocationEraser: InvestmentAllocationEraser) {}
  
    subscribedTo(): DomainEventClass[] {
      return [InvestmentAllocationUpdated];
    }
  
    async on(domainEvent: InvestmentAllocationUpdated): Promise<void> {
      const { aggregateId, allocation} = domainEvent;

      const allocationHasZeroShares = allocation.shares === 0;

      if (!allocationHasZeroShares) {
        return;
      }

      const portfolioId = new InvestmentPortfolioId(aggregateId);
      const allocationId = new InvestmentAllocationId(allocation.id);
  
      return this.allocationEraser.run({ portfolioId, allocationId });
    }
}
  