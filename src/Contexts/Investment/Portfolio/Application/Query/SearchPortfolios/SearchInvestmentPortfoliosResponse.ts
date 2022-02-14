import { QueryResponse } from '../../../../../Shared/Domain/CQRS/Query/QueryResponse';
import { InvestmentPortfolioDTO } from '../../../Domain/Model/Portfolio/InvestmentPortfolioDTO';

export class SearchInvestmentPortfoliosResponse implements QueryResponse {
  readonly portfolios: InvestmentPortfolioDTO[];

  constructor(portfolios: InvestmentPortfolioDTO[]) {
    this.portfolios = portfolios;
  }
}
