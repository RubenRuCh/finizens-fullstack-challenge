import { InvestmentPortfolioId } from './../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { DomainEventClass } from "../../../../../Shared/Domain/Event/DomainEvent";
import { DomainEventSubscriber } from "../../../../../Shared/Domain/Event/DomainEventSubscriber";
import { InvestmentOrderCompleted } from "../../../../Order/Domain/Event/Order/InvestmentOrderCompleted";
import { InvestmentAllocationId } from "../../../../Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentShares } from "../../../../Shared/Domain/ValueObject/InvestmentShares";
import { InvestmentAllocation } from "../../../Domain/Model/Allocation/InvestmentAllocation";
import { InvestmentPortfolio } from "../../../Domain/Model/Portfolio/InvestmentPortfolio";
import { FindInvestmentPortfolioByIdQuery } from "../../Query/FindPortfolio/FindInvestmentPortfolioByIdQuery";
import { FindInvestmentPortfolioByIdQueryHandler } from "../../Query/FindPortfolio/FindInvestmentPortfolioByIdQueryHandler";
import { InvestmentPortfolioFinder } from "../../Query/FindPortfolio/InvestmentPortfolioFinder";
import { CreateInvestmentAllocationCommandHandler } from "./CreateInvestmentAllocationCommandHandler";
import { InvestmentAllocationCreator } from "./InvestmentAllocationCreator";
import { Nullable } from '../../../../../Shared/Domain/Nullable';
import { InvestmentOrder } from '../../../../Order/Domain/Model/InvestmentOrder';
import { CreateInvestmentAllocationRequest } from './CreateInvestmentAllocationRequest';
import { CreateInvestmentAllocationCommand } from './CreateInvestmentAllocationCommand';

export class UpdateInvestmentPortfolioAllocationsOnOrderCompleted implements DomainEventSubscriber<InvestmentOrderCompleted> {
  
  private createAllocationHandler: CreateInvestmentAllocationCommandHandler;
  private findPortfolioByIdHandler: FindInvestmentPortfolioByIdQueryHandler;

  constructor(
    private allocationCreator: InvestmentAllocationCreator,
    private portfolioFinder: InvestmentPortfolioFinder,
    ) {
    this.createAllocationHandler = new CreateInvestmentAllocationCommandHandler(this.allocationCreator);
    this.findPortfolioByIdHandler = new FindInvestmentPortfolioByIdQueryHandler(this.portfolioFinder);
  }

  subscribedTo(): DomainEventClass[] {
    return [InvestmentOrderCompleted];
  }

  async on(domainEvent: InvestmentOrderCompleted): Promise<void> {
    const { aggregateId, order: orderDTO } = domainEvent;

    const order = InvestmentOrder.fromDTO(orderDTO);
    const allocation = await this.getAllocation(order.portfolioId, order.allocationId);

    const currentAllocationShares = new InvestmentShares(allocation ? allocation.shares.value : 0);
    const newAllocationShares = InvestmentOrder.newShares({ order, currentShares: currentAllocationShares });

    const request: CreateInvestmentAllocationRequest = {
      portfolioId: aggregateId,
      allocationId: order.allocationId.value,
      shares: newAllocationShares.value
    };

    const command = new CreateInvestmentAllocationCommand(request);

    this.createAllocationHandler.handle(command)
  }

  private async getAllocation(portfolioId: InvestmentPortfolioId, allocationId: InvestmentAllocationId): Promise<Nullable<InvestmentAllocation>> {
    const portfolio = await this.findPortfolio(portfolioId);

    return portfolio.getAllocation(allocationId);
  }

  private async findPortfolio(portfolioId: InvestmentPortfolioId): Promise<InvestmentPortfolio> {
    const queryResponse = await this.findPortfolioByIdHandler.handle(new FindInvestmentPortfolioByIdQuery(portfolioId.value));

    return queryResponse.portfolio;
  }
}
  