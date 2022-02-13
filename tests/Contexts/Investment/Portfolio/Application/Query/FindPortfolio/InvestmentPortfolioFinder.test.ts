import { FindInvestmentPortfolioByIdQueryHandler } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQueryHandler';
import { InvestmentPortfolioFinder } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/FindPortfolio/InvestmentPortfolioFinder';
import { InvestmentPortfolioNotFoundException } from '../../../../../../../src/Contexts/Investment/Portfolio/Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import { InvestmentPortfolioId } from '../../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentPortfolioMother } from '../../../Domain/Model/InvestmentPortfolioMother';
import { InvestmentPortfolioRepositoryMock } from '../../../__mocks/InvestmentPortfolioRepositoryMock';
import { FindInvestmentPortfolioByIdQueryMother } from './FindInvestmentPortfolioByIdQueryMother';

let repository: InvestmentPortfolioRepositoryMock;
let handler: FindInvestmentPortfolioByIdQueryHandler;

describe('InvestmentPortfolioFinder', () => {
  beforeEach(() => {
    repository = new InvestmentPortfolioRepositoryMock();
    const finder = new InvestmentPortfolioFinder(repository);
    handler = new FindInvestmentPortfolioByIdQueryHandler(finder);
  });

  it('should find an existing portfolio', async () => {
    const portfolio = InvestmentPortfolioMother.random();
    const query = FindInvestmentPortfolioByIdQueryMother.create(portfolio.id.value);

    repository.whenSearchThenReturn(portfolio);

    const queryResponse = await handler.handle(query);

    repository.assertLastSearchedPortfolioIs(portfolio.id);
    expect(queryResponse.portfolio).toEqual(portfolio);
  });

  it('should throw exception if the portfolio does not exist', async () => {
    const query = FindInvestmentPortfolioByIdQueryMother.random();

    repository.whenSearchThenReturn(null)

    expect.assertions(3);

    try {
      await handler.handle(query);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvestmentPortfolioNotFoundException);
      expect(error.message).toBe(query.portfolioId);
    }

    repository.assertLastSearchedPortfolioIs(new InvestmentPortfolioId(query.portfolioId));
  });
});
