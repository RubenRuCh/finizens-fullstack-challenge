import { QueryResponse } from '../../../../../Shared/Domain/CQRS/Query/QueryResponse';
import { InvestmentPortfolio } from '../../../Domain/Model/Portfolio/InvestmentPortfolio';

export class SearchInvestmentPortfoliosResponse implements QueryResponse {
  readonly portfolios: InvestmentPortfolio[];

  constructor(portfolios: InvestmentPortfolio[]) {
    this.portfolios = portfolios;
  }
}
  