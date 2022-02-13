import { SearchNonCompletedInvestmentOrdersByPortfolioIdQuery } from '../../../../../../../src/Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/SearchNonCompletedInvestmentOrdersByPortfolioIdQuery';
import { InvestmentPortfolioIdMother } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother';

export class SearchNonCompletedInvestmentOrdersByPortfolioIdQueryMother {
    static create(portfolioId: string): SearchNonCompletedInvestmentOrdersByPortfolioIdQuery {
        return new SearchNonCompletedInvestmentOrdersByPortfolioIdQuery(portfolioId);
    }
  
    static random(): SearchNonCompletedInvestmentOrdersByPortfolioIdQuery {
        return this.create(
            InvestmentPortfolioIdMother.random().value, 
        );
    }
}
  