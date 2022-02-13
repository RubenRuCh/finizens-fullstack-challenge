import { QueryResponse } from '../../../../../Shared/Domain/CQRS/Query/QueryResponse';
import { InvestmentPortfolio } from './../../../Domain/Model/Portfolio/InvestmentPortfolio';

export class FindInvestmentPortfolioResponse implements QueryResponse {
  readonly portfolio: InvestmentPortfolio;

  constructor(portfolio: InvestmentPortfolio) {
    this.portfolio = portfolio;
  }
}
  