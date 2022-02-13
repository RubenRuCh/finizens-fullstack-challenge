import { CreateInvestmentAllocationCommandHandler } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/CreateInvestmentAllocationCommandHandler';
import { InvestmentAllocationCreator } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/InvestmentAllocationCreator';
import { InvestmentPortfolioRepositoryMock } from '../../../__mocks/InvestmentPortfolioRepositoryMock';
import { CreateInvestmentAllocationCommandMother } from './CreateInvestmentAllocationCommandMother';
import { InvestmentAllocationMother } from '../../../Domain/Model/InvestmentAllocationMother';
import { InvestmentPortfolioMother } from '../../../Domain/Model/InvestmentPortfolioMother';
import { InvestmentAllocationCreated } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Event/Allocation/InvestmentAllocationCreated';
import { InvestmentAllocationUpdated } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Event/Allocation/InvestmentAllocationUpdated';
import { InvestmentPortfolioNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import EventBusMock from '../../../../../Shared/__mocks/EventBusMock';

let repository: InvestmentPortfolioRepositoryMock;
let handler: CreateInvestmentAllocationCommandHandler;
let eventBus: EventBusMock;

describe('InvestmentAllocationCreator', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new InvestmentPortfolioRepositoryMock();
    const creator = new InvestmentAllocationCreator(repository, eventBus);
    handler = new CreateInvestmentAllocationCommandHandler(creator);
  });
  
  it('should create a valid allocation', async () => {
    const portfolio = InvestmentPortfolioMother.random();

    repository.whenSearchThenReturn(portfolio);

    const allocationCommand = CreateInvestmentAllocationCommandMother.random();
    const allocation = InvestmentAllocationMother.fromCommand(allocationCommand);

    await handler.handle(allocationCommand);

    repository.assertLastSavedPortfolioIs(portfolio);
    eventBus.assertSomePublishedEventIs(new InvestmentAllocationCreated({ 
      aggregateId: portfolio.id.value,
      allocation: allocation.toDTO() 
    }), 1);
  });


  it('should update the allocation if it already exists in the portfolio', async () => {
    const portfolio = InvestmentPortfolioMother.random();

    repository.whenSearchThenReturn(portfolio);

    const allocationCommand = CreateInvestmentAllocationCommandMother.random();
    const allocation = InvestmentAllocationMother.fromCommand(allocationCommand);

    portfolio.allocations.push(allocation);

    await handler.handle(allocationCommand);

    repository.assertLastSavedPortfolioIs(portfolio);
    eventBus.assertSomePublishedEventIs(new InvestmentAllocationUpdated({ 
      aggregateId: portfolio.id.value,
      allocation: allocation.toDTO() 
    }), 1);
  });

  it('should throw exception if the portfolio does not exists', async () => {
    repository.whenSearchThenReturn(null);

    const allocationCommand = CreateInvestmentAllocationCommandMother.random();

    expect.assertions(2);
    try {
      await handler.handle(allocationCommand);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvestmentPortfolioNotFoundException);
      expect(error.message).toBe(allocationCommand.portfolioId);
    }
  });
});
