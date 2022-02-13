import { Query } from '../../../../../Shared/Domain/CQRS/Query/Query';
import { QueryHandler } from '../../../../../Shared/Domain/CQRS/Query/QueryHandler';
import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { SearchNonCompletedInvestmentOrdersByPortfolioIdQuery } from './SearchNonCompletedInvestmentOrdersByPortfolioIdQuery';
import { NonCompletedInvestmentOrderSearcher } from './NonCompletedInvestmentOrderSearcher';
import { SearchInvestmentOrdersResponse } from './SearchInvestmentOrdersResponse';

export class SearchNonCompletedInvestmentOrdersByPortfolioIdQueryHandler
implements QueryHandler<SearchNonCompletedInvestmentOrdersByPortfolioIdQuery, SearchInvestmentOrdersResponse> {
    constructor(private searcher: NonCompletedInvestmentOrderSearcher) {}

    subscribedTo(): Query {
        return SearchNonCompletedInvestmentOrdersByPortfolioIdQuery;
    }

    handle(query: SearchNonCompletedInvestmentOrdersByPortfolioIdQuery): Promise<SearchInvestmentOrdersResponse> {
        const portfolioId = new InvestmentPortfolioId(query.portfolioId);

        return this.searcher.run(portfolioId);
    }
}
