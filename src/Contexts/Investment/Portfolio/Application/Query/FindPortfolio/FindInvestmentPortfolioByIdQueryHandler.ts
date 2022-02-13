import { Query } from '../../../../../Shared/Domain/CQRS/Query/Query';
import { QueryHandler } from '../../../../../Shared/Domain/CQRS/Query/QueryHandler';
import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { FindInvestmentPortfolioByIdQuery } from './FindInvestmentPortfolioByIdQuery';
import { FindInvestmentPortfolioResponse } from './FindInvestmentPortfolioResponse';
import { InvestmentPortfolioFinder } from './InvestmentPortfolioFinder';

export class FindInvestmentPortfolioByIdQueryHandler
implements QueryHandler<FindInvestmentPortfolioByIdQuery, FindInvestmentPortfolioResponse> {
    constructor(private finder: InvestmentPortfolioFinder) {}

    subscribedTo(): Query {
        return FindInvestmentPortfolioByIdQuery;
    }

    handle(query: FindInvestmentPortfolioByIdQuery): Promise<FindInvestmentPortfolioResponse> {
        const portfolioId = new InvestmentPortfolioId(query.portfolioId);

        return this.finder.run(portfolioId);
    }
}
