import { SearchInvestmentPortfoliosQueryHandler } from './../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/SearchInvestmentPortfoliosQueryHandler';
import { InvestmentPortfolioMother } from '../../../Domain/Model/InvestmentPortfolioMother';
import { InvestmentPortfolioRepositoryMock } from '../../../__mocks/InvestmentPortfolioRepositoryMock';
import { InvestmentPortfoliosSearcher } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/InvestmentPortfoliosSearcher';
import { SearchInvestmentPortfoliosQueryMother } from './SearchInvestmentPortfoliosQueryMother';

let repository: InvestmentPortfolioRepositoryMock;
let handler: SearchInvestmentPortfoliosQueryHandler;

describe('InvestmentPortfolioSearcher.test', () => {
  beforeEach(() => {
    repository = new InvestmentPortfolioRepositoryMock();
    const searcher = new InvestmentPortfoliosSearcher(repository);
    handler = new SearchInvestmentPortfoliosQueryHandler(searcher);
  });

  it('should return all existing portfolios', async () => {
    const query = SearchInvestmentPortfoliosQueryMother.random();

    const firstPortfolio = InvestmentPortfolioMother.random();
    const secondPortfolio = InvestmentPortfolioMother.random();
    const thirdPortfolio = InvestmentPortfolioMother.random();
    
    const storedPortfolios = [firstPortfolio, secondPortfolio, thirdPortfolio];

    repository.whenSearchByCriteriaThenReturn(storedPortfolios);

    const queryResponse = await handler.handle(query);
    expect(queryResponse.portfolios.length).toBe(3);
    expect(queryResponse.portfolios).toEqual(storedPortfolios)
  });
  
  it('should return empty array if there is no portfolios stored', async () => {
    const query = SearchInvestmentPortfoliosQueryMother.random();

    repository.whenSearchByCriteriaThenReturn([]);

    const queryResponse = await handler.handle(query);
    expect(queryResponse.portfolios.length).toBe(0);
    expect(queryResponse.portfolios).toEqual([])
  });

});
