import { Query } from '../../../../../Shared/Domain/CQRS/Query/Query';

export class SearchNonCompletedInvestmentOrdersByPortfolioIdQuery implements Query {
  readonly portfolioId: string;

  constructor(
    portfolioId: string,
  ) {
    this.portfolioId = portfolioId;
  }
}
