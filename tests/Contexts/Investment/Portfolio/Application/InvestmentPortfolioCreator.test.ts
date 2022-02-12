import { CreateInvestmentPortfolioCommandHandler } from '../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommandHandler';
import { InvestmentPortfolioCreator } from '../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/InvestmentPortfolioCreator';
import { InvestmentPortfolioMother } from '../Domain/Model/InvestmentPortfolioMother';
import EventBusMock from '../__mocks/EventBusMock';
import { InvestmentPortfolioRepositoryMock } from '../__mocks/InvestmentPortfolioRepositoryMock';
import { CreateInvestmentPortfolioCommandMother } from './CreateInvestmentPortfolioCommandMother';

let repository: InvestmentPortfolioRepositoryMock;
let handler: CreateInvestmentPortfolioCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new InvestmentPortfolioRepositoryMock();
  const creator = new InvestmentPortfolioCreator(repository, eventBus);
  handler = new CreateInvestmentPortfolioCommandHandler(creator);
});

describe('InvestmentPortfolioCreator.test', () => {
  it('should create a valid portfolio', async () => {
    const command = CreateInvestmentPortfolioCommandMother.random();
    await handler.handle(command);

    const course = InvestmentPortfolioMother.fromCommand(command);
    repository.assertLastSavedPortfolioIs(course);
  });
});
