import { QueryResponse } from '../../../../../Shared/Domain/CQRS/Query/QueryResponse';
import { InvestmentPortfolioDTO } from '../../../Domain/Model/Portfolio/InvestmentPortfolioDTO';
export class FindInvestmentPortfolioResponse implements QueryResponse {
  readonly portfolio: InvestmentPortfolioDTO;

  constructor(portfolio: InvestmentPortfolioDTO) {
    this.portfolio = portfolio;
  }
}
