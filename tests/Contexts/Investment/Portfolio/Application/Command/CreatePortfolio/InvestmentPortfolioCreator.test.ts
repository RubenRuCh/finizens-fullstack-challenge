import { InvestmentPortfolioCreated } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Event/Portfolio/InvestmentPortfolioCreated';
import { CreateInvestmentPortfolioCommandHandler } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommandHandler';
import { InvestmentPortfolioCreator } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/InvestmentPortfolioCreator';
import { InvestmentPortfolioMother } from '../../../Domain/Model/InvestmentPortfolioMother';
import EventBusMock from '../../../__mocks/EventBusMock';
import { InvestmentPortfolioRepositoryMock } from '../../../__mocks/InvestmentPortfolioRepositoryMock';
import { CreateInvestmentPortfolioCommandMother } from './CreateInvestmentPortfolioCommandMother';
import { InvestmentPortfolioCleared } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Event/Portfolio/InvestmentPortfolioCleared';

let repository: InvestmentPortfolioRepositoryMock;
let handler: CreateInvestmentPortfolioCommandHandler;
let eventBus: EventBusMock;

describe('InvestmentPortfolioCreator', () => {
  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new InvestmentPortfolioRepositoryMock();
    const creator = new InvestmentPortfolioCreator(repository, eventBus);
    handler = new CreateInvestmentPortfolioCommandHandler(creator);
  });

  it('should create a valid portfolio', async () => {
    const command = CreateInvestmentPortfolioCommandMother.random();
    const portfolio = InvestmentPortfolioMother.fromCommand(command);

    await handler.handle(command);

    repository.assertLastSavedPortfolioIs(portfolio);
    eventBus.assertLastPublishedEventIs(new InvestmentPortfolioCreated({ portfolio: portfolio.toDTO() }));
  });

  it('should clear the portfolio if already exists', async () => {
    const command = CreateInvestmentPortfolioCommandMother.random();
    const portfolio = InvestmentPortfolioMother.fromCommand(command);

    repository.whenSearchThenReturn(portfolio)

    await handler.handle(command);

    repository.assertLastSavedPortfolioIs(portfolio);
    eventBus.assertLastPublishedEventIs(new InvestmentPortfolioCleared({ portfolio: portfolio.toDTO() }));
  });
});
