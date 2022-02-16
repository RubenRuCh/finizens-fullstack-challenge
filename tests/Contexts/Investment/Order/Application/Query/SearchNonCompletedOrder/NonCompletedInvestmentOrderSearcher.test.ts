import { InvestmentPortfolioMother } from './../../../../Portfolio/Domain/Model/InvestmentPortfolioMother';
import { SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler } from '../../../../../../../src/Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler';
import { NonCompletedInvestmentOrderSearcher } from './../../../../../../../src/Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/NonCompletedInvestmentOrderSearcher';
import { InvestmentPortfolioId } from '../../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentOrderRepositoryMock } from '../../../__mocks/InvestmentOrderRepositoryMock';
import { SearchNonCompletedInvestmentOrdersByPortfolioIdQueryMother } from './SearchNonCompletedInvestmentOrdersByPortfolioIdQueryMother';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';

let repository: InvestmentOrderRepositoryMock;
let handler: SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler;

describe('NonCompletedInvestmentOrderSearcher', () => {
  beforeEach(() => {
    repository = new InvestmentOrderRepositoryMock();
    const searcher = new NonCompletedInvestmentOrderSearcher(repository);
    handler = new SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler(searcher);
  });

  it('should return empty array if portfolio does not have orders', async () => {
    const query = SearchNonCompletedInvestmentOrdersByPortfolioIdQueryMother.random();

    repository.whenSearchByPortfolioIdThenReturn([]);

    const response = await handler.handle(query);

    repository.assertLastSearchedPortfolioIdIs(new InvestmentPortfolioId(query.portfolioId));
    expect(response.orders).toEqual([]);
  });

  it('should return array with only non-completed orders of the portfolio', async () => {
    const portfolio = InvestmentPortfolioMother.random();
    const query = SearchNonCompletedInvestmentOrdersByPortfolioIdQueryMother.create(portfolio.id.value);

    const firstCompletedOrder = InvestmentOrderMother.completed();
    const secondCompletedOrder = InvestmentOrderMother.completed();

    const firstPendingOrder = InvestmentOrderMother.pending();
    const secondPendingOrder = InvestmentOrderMother.pending();

    const orders = [
      firstCompletedOrder,
      secondCompletedOrder,

      firstPendingOrder,
      secondPendingOrder
    ];

    repository.whenSearchByPortfolioIdThenReturn(orders);

    const response = await handler.handle(query);

    repository.assertLastSearchedPortfolioIdIs(portfolio.id);
    expect(response.orders).toEqual([firstPendingOrder.toDTO(), secondPendingOrder.toDTO()]);
  });
});
