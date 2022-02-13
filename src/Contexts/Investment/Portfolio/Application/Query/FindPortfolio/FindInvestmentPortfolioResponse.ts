import { InvestmentPortfolio } from './../../../Domain/Model/Portfolio/InvestmentPortfolio';

export class FindInvestmentPortfolioResponse {
  readonly portfolio: InvestmentPortfolio;

  constructor(portfolio: InvestmentPortfolio) {
    this.portfolio = portfolio;
  }
}
  