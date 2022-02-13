import { Query } from '../../../../../Shared/Domain/CQRS/Query/Query';

export class FindInvestmentPortfolioByIdQuery implements Query {
  readonly portfolioId: string;

  constructor(
    portfolioId: string,
  ) {
    this.portfolioId = portfolioId;
  }
}
