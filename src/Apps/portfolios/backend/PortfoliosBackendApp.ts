import { UpdateInvestmentPortfolioAllocationsOnOrderCompleted } from './../../../Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/UpdateInvestmentPortfolioAllocationsOnOrderCompleted';
import { DeleteAllocationWhenSharesIsZeroOnAllocationUpdated } from '../../../Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/DeleteAllocationWhenSharesIsZeroOnAllocationUpdated';
import { InvestmentAllocationEraser } from '../../../Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/InvestmentAllocationEraser';
import { InMemoryInvestmentPortfolioRepository } from '../../../Contexts/Investment/Portfolio/Infraestructure/Repository/InMemoryInvestmentPortfolioRepository';
import { DomainEvent } from '../../../Contexts/Shared/Domain/Event/DomainEvent';
import { DomainEventMapping } from '../../../Contexts/Shared/Domain/Event/DomainEventMapping';
import { DomainEventSubscriber } from '../../../Contexts/Shared/Domain/Event/DomainEventSubscriber';
import { InMemorySyncEventBus } from '../../../Contexts/Shared/Infraestructure/EventBus/InMemory/InMemorySyncEventBus';
import { Server } from './server';
import { InvestmentAllocationCreator } from '../../../Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/InvestmentAllocationCreator';
import { InvestmentPortfolioFinder } from '../../../Contexts/Investment/Portfolio/Application/Query/FindPortfolio/InvestmentPortfolioFinder';
import { DeleteInvestmentOrdersOfPortfolioOnPortfolioCleaned } from '../../../Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/DeleteInvestmentOrdersOfPortfolioOnPortfolioCleaned';
import { InvestmentOrdersOfPortfolioEraser } from '../../../Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/InvestmentOrdersOfPortfolioEraser';
import { InMemoryInvestmentOrderRepository } from '../../../Contexts/Investment/Order/Infraestructure/Repository/InMemoryInvestmentOrderRepository';
import { QueryHandlersInformation } from '../../../Contexts/Shared/Infraestructure/QueryBus/QueryHandlersInformation';
import { QueryHandler } from '../../../Contexts/Shared/Domain/CQRS/Query/QueryHandler';
import { Query } from '../../../Contexts/Shared/Domain/CQRS/Query/Query';
import { QueryResponse } from '../../../Contexts/Shared/Domain/CQRS/Query/QueryResponse';
import { SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler } from '../../../Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler';
import { NonCompletedInvestmentOrderSearcher } from '../../../Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/NonCompletedInvestmentOrderSearcher';
import { FindInvestmentPortfolioByIdQueryHandler } from '../../../Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQueryHandler';
import { SearchInvestmentPortfoliosQueryHandler } from '../../../Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/SearchInvestmentPortfoliosQueryHandler';
import { InvestmentPortfoliosSearcher } from '../../../Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/InvestmentPortfoliosSearcher';
import { CommandHandlersInformation } from '../../../Contexts/Shared/Infraestructure/CommandBus/CommandHandlersInformation';
import { CommandHandler } from '../../../Contexts/Shared/Domain/CQRS/Command/CommandHandler';
import { Command } from '../../../Contexts/Shared/Domain/CQRS/Command/Command';
import { CompleteInvestmentOrderCommandHandler } from '../../../Contexts/Investment/Order/Application/Command/CompleteOrder/CompleteInvestmentOrderCommandHandler';
import { InvestmentOrderCompleter } from '../../../Contexts/Investment/Order/Application/Command/CompleteOrder/InvestmentOrderCompleter';
import { CreateInvestmentOrderCommandHandler } from '../../../Contexts/Investment/Order/Application/Command/CreateOrder/CreateInvestmentOrderCommandHandler';
import { InvestmentOrderCreator } from '../../../Contexts/Investment/Order/Application/Command/CreateOrder/InvestmentOrderCreator';
import { DeleteInvestmentOrdersOfPortfolioCommandHandler } from '../../../Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/DeleteInvestmentOrdersOfPortfolioCommandHandler';
import { CreateInvestmentPortfolioCommandHandler } from '../../../Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommandHandler';
import { InvestmentPortfolioCreator } from '../../../Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/InvestmentPortfolioCreator';
import { DeleteInvestmentAllocationCommandHandler } from '../../../Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/DeleteInvestmentAllocationCommandHandler';
import { CreateInvestmentAllocationCommandHandler } from '../../../Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/CreateInvestmentAllocationCommandHandler';

export class PortfoliosBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '8000';
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): string {
    if (!this.server) {
      throw new Error('Portfolios backend application has not been started');
    }

    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }

  private async registerSubscribers() {
    const eventBus = new InMemorySyncEventBus();

    const inMemoryPortfolioRepo = new InMemoryInvestmentPortfolioRepository();
    const inMemoryOrderRepo = new InMemoryInvestmentOrderRepository();
    
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscribers.push(new DeleteAllocationWhenSharesIsZeroOnAllocationUpdated(
      new InvestmentAllocationEraser(inMemoryPortfolioRepo, eventBus)
    ));
    
    subscribers.push(new UpdateInvestmentPortfolioAllocationsOnOrderCompleted(
      new InvestmentAllocationCreator(inMemoryPortfolioRepo, eventBus),
      new InvestmentPortfolioFinder(inMemoryPortfolioRepo),
    ));

    subscribers.push(new DeleteInvestmentOrdersOfPortfolioOnPortfolioCleaned(
      new InvestmentOrdersOfPortfolioEraser(inMemoryOrderRepo),
    ));

    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}

export function prepareQueryHandlers(): QueryHandlersInformation {
  const inMemoryPortfolioRepo = new InMemoryInvestmentPortfolioRepository();
  const inMemoryOrderRepo = new InMemoryInvestmentOrderRepository();

  const queryHandlers: QueryHandler<Query, QueryResponse>[] = [];

  queryHandlers.push(new SearchInvestmentPortfoliosQueryHandler(
    new InvestmentPortfoliosSearcher(inMemoryPortfolioRepo),
  ));

  queryHandlers.push(new SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler(
    new NonCompletedInvestmentOrderSearcher(inMemoryOrderRepo),
  ));

  queryHandlers.push(new FindInvestmentPortfolioByIdQueryHandler(
    new InvestmentPortfolioFinder(inMemoryPortfolioRepo),
  ));

  return new QueryHandlersInformation(queryHandlers);
}

export function prepareCommandHandlers(): CommandHandlersInformation {
  const eventBus = new InMemorySyncEventBus();

  const inMemoryPortfolioRepo = new InMemoryInvestmentPortfolioRepository();
  const inMemoryOrderRepo = new InMemoryInvestmentOrderRepository();

  const commandHandlers: Array<CommandHandler<Command>> = [];

  commandHandlers.push(new CompleteInvestmentOrderCommandHandler(
    new InvestmentOrderCompleter(inMemoryOrderRepo, eventBus),
  ));

  commandHandlers.push(new CreateInvestmentOrderCommandHandler(
    new InvestmentOrderCreator(
      inMemoryOrderRepo, 
      new FindInvestmentPortfolioByIdQueryHandler(
        new InvestmentPortfolioFinder(inMemoryPortfolioRepo),
      ), 
      eventBus
    ),
  ));
  
  commandHandlers.push(new DeleteInvestmentOrdersOfPortfolioCommandHandler(
    new InvestmentOrdersOfPortfolioEraser(inMemoryOrderRepo),
  ));

  commandHandlers.push(new CreateInvestmentPortfolioCommandHandler(
    new InvestmentPortfolioCreator(inMemoryPortfolioRepo, eventBus),
  ));

  commandHandlers.push(new DeleteInvestmentAllocationCommandHandler(
    new InvestmentAllocationEraser(inMemoryPortfolioRepo, eventBus),
  ));

  commandHandlers.push(new CreateInvestmentAllocationCommandHandler(
    new InvestmentAllocationCreator(inMemoryPortfolioRepo, eventBus),
  ));

  return new CommandHandlersInformation(commandHandlers);
}