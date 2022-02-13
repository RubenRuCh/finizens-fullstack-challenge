import { FindInvestmentPortfolioByIdQuery } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQuery';
import { InvestmentPortfolioIdMother } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother';

export class FindInvestmentPortfolioByIdQueryMother {
    static create(id: string): FindInvestmentPortfolioByIdQuery {
        return new FindInvestmentPortfolioByIdQuery(id);
    }
  
    static random(): FindInvestmentPortfolioByIdQuery {
        return this.create(
            InvestmentPortfolioIdMother.random().value, 
        );
    }
}
  