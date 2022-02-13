import { DeleteInvestmentAllocationCommandHandler } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/DeleteInvestmentAllocationCommandHandler';
import { InvestmentAllocationEraser } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/InvestmentAllocationEraser';
import EventBusMock from '../../../__mocks/EventBusMock';
import { InvestmentPortfolioRepositoryMock } from '../../../__mocks/InvestmentPortfolioRepositoryMock';
import { InvestmentAllocationMother } from '../../../Domain/Model/InvestmentAllocationMother';
import { InvestmentPortfolioMother } from '../../../Domain/Model/InvestmentPortfolioMother';
import { InvestmentPortfolioNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import { InvestmentAllocationNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Allocation/InvestmentAllocationNotFoundException';
import { InvestmentAllocationDeleted } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Event/Allocation/InvestmentAllocationDeleted';
import { DeleteInvestmentAllocationCommandMother } from './DeleteInvestmentAllocationCommandMother';

let repository: InvestmentPortfolioRepositoryMock;
let handler: DeleteInvestmentAllocationCommandHandler;
let eventBus: EventBusMock;

describe('InvestmentAllocationEraser', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new InvestmentPortfolioRepositoryMock();
    const eraser = new InvestmentAllocationEraser(repository, eventBus);
    handler = new DeleteInvestmentAllocationCommandHandler(eraser);
  });
  
  it('should delete an existing allocation', async () => {
    const portfolio = InvestmentPortfolioMother.random();
    const allocation = InvestmentAllocationMother.random();
    const allocationCommand = DeleteInvestmentAllocationCommandMother.create(portfolio.id.value, allocation.id.value);

    portfolio.allocations.push(allocation);
    repository.whenSearchThenReturn(portfolio);

    await handler.handle(allocationCommand);

    repository.assertLastSavedPortfolioIs(portfolio);
    eventBus.assertSomePublishedEventIs(new InvestmentAllocationDeleted({ 
      aggregateId: portfolio.id.value,
      allocation: allocation.toDTO() 
    }), 1);
  });


  it('should throw exception if the allocation is not included in the portfolio', async () => {
    const portfolio = InvestmentPortfolioMother.random();
    const allocation = InvestmentAllocationMother.random();
    const allocationCommand = DeleteInvestmentAllocationCommandMother.create(portfolio.id.value, allocation.id.value);

    repository.whenSearchThenReturn(portfolio);

    expect.assertions(2);
    try {
      await handler.handle(allocationCommand);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvestmentAllocationNotFoundException);
      expect(error.message).toBe(allocationCommand.allocationId);
    }
 
  });

  it('should throw exception if the portfolio does not exists', async () => {
    repository.whenSearchThenReturn(null);

    const allocationCommand = DeleteInvestmentAllocationCommandMother.random();

    expect.assertions(2);
    try {
      await handler.handle(allocationCommand);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvestmentPortfolioNotFoundException);
      expect(error.message).toBe(allocationCommand.portfolioId);
    }
  });
});
