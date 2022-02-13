import { Query } from "../../../../../Shared/Domain/CQRS/Query/Query";
import { QueryHandler } from "../../../../../Shared/Domain/CQRS/Query/QueryHandler";
import { InvestmentPortfoliosSearcher } from "./InvestmentPortfoliosSearcher";
import { SearchInvestmentPortfoliosQuery } from "./SearchInvestmentPortfoliosQuery";
import { SearchInvestmentPortfoliosResponse } from "./SearchInvestmentPortfoliosResponse";

export class SearchInvestmentPortfoliosQueryHandler implements QueryHandler<SearchInvestmentPortfoliosQuery, SearchInvestmentPortfoliosResponse> {
    constructor(private searcher: InvestmentPortfoliosSearcher) {}

    subscribedTo(): Query {
        return SearchInvestmentPortfoliosQuery;
    }

    handle(query: SearchInvestmentPortfoliosQuery): Promise<SearchInvestmentPortfoliosResponse> {
        return this.searcher.run();
    }
}
