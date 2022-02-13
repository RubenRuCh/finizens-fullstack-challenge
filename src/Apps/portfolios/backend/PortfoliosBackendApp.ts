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
    
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscribers.push(new DeleteAllocationWhenSharesIsZeroOnAllocationUpdated(
      new InvestmentAllocationEraser(inMemoryPortfolioRepo, eventBus)
    ));
    
    subscribers.push(new UpdateInvestmentPortfolioAllocationsOnOrderCompleted(
      new InvestmentAllocationCreator(inMemoryPortfolioRepo, eventBus),
      new InvestmentPortfolioFinder(inMemoryPortfolioRepo),
    ));

    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}
