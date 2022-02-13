import { Criteria } from '../../../../../Shared/Domain/Criteria/Criteria';
import { Filters } from '../../../../../Shared/Domain/Criteria/Filters';
import { Order } from '../../../../../Shared/Domain/Criteria/Order';
import { OrderBy } from '../../../../../Shared/Domain/Criteria/OrderBy';
import { OrderType, OrderTypes } from '../../../../../Shared/Domain/Criteria/OrderType';
import { InvestmentPortfolioRepository } from '../../../Domain/Model/InvestmentPortfolioRepository';
import { SearchInvestmentPortfoliosResponse } from './SearchInvestmentPortfoliosResponse';

export class InvestmentPortfoliosSearcher {
  constructor(private repository: InvestmentPortfolioRepository) {}

  async run(): Promise<SearchInvestmentPortfoliosResponse> {
    const filters = new Filters([]);

    const orderBy = new OrderBy('id');
    const orderType = new OrderType(OrderTypes.NONE);
    const order = new Order(orderBy, orderType);

    const criteria = new Criteria(filters, order);

    const portfolios = await this.repository.search(criteria);

    return new SearchInvestmentPortfoliosResponse(portfolios);
  }
}
