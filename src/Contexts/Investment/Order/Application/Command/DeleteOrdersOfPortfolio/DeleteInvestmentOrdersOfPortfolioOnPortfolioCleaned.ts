import { InvestmentPortfolioCleared } from './../../../../Portfolio/Domain/Event/Portfolio/InvestmentPortfolioCleared';
import { DomainEventSubscriber } from "../../../../../Shared/Domain/Event/DomainEventSubscriber";
import { DomainEventClass } from '../../../../../Shared/Domain/Event/DomainEvent';
import { DeleteInvestmentOrdersOfPortfolioCommandHandler } from './DeleteInvestmentOrdersOfPortfolioCommandHandler';
import { InvestmentOrdersOfPortfolioEraser } from './InvestmentOrdersOfPortfolioEraser';
import { DeleteInvestmentOrdersOfPortfolioRequest } from './DeleteInvestmentOrdersOfPortfolioRequest';
import { DeleteInvestmentOrdersOfPortfolioCommand } from './DeleteInvestmentOrdersOfPortfolioCommand';

export class DeleteInvestmentOrdersOfPortfolioOnPortfolioCleaned implements DomainEventSubscriber<InvestmentPortfolioCleared> {

    private handler: DeleteInvestmentOrdersOfPortfolioCommandHandler;
  
    constructor(private ordersEraser: InvestmentOrdersOfPortfolioEraser) {
      this.handler = new DeleteInvestmentOrdersOfPortfolioCommandHandler(this.ordersEraser);
    }
  
    subscribedTo(): DomainEventClass[] {
      return [InvestmentPortfolioCleared];
    }
  
    async on(domainEvent: InvestmentPortfolioCleared): Promise<void> {
      const { aggregateId } = domainEvent;
    
      const request: DeleteInvestmentOrdersOfPortfolioRequest = {
        portfolioId: aggregateId,
      };
  
      const command = new DeleteInvestmentOrdersOfPortfolioCommand(request);
  
      this.handler.handle(command)
    }
  }
    