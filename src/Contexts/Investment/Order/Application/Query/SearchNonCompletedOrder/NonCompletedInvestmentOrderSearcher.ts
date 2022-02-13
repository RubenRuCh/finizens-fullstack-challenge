import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentOrderRepository } from '../../../Domain/Model/InvestmentOrderRepository';
import { SearchInvestmentOrdersResponse } from './SearchInvestmentOrdersResponse';

export class NonCompletedInvestmentOrderSearcher {
  constructor(private repository: InvestmentOrderRepository) {}

  async run(portfolioId: InvestmentPortfolioId): Promise<SearchInvestmentOrdersResponse> {
    const allOrdersOfPortfolio = await this.repository.getByPortfolioId(portfolioId);

    // TODO Use criteria pattern in repo implementation to optimize performance of this filter
    const nonCompletedOrdersOfPortfolio = allOrdersOfPortfolio.filter(order => order.status.isPending);

    return new SearchInvestmentOrdersResponse(nonCompletedOrdersOfPortfolio);
  }
}
