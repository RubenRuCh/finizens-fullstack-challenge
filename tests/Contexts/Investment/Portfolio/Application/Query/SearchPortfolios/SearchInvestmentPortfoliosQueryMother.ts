import { SearchInvestmentPortfoliosQuery } from '../../../../../../../src/Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/SearchInvestmentPortfoliosQuery';

export class SearchInvestmentPortfoliosQueryMother {
    static create(): SearchInvestmentPortfoliosQuery {
        return new SearchInvestmentPortfoliosQuery();
    }
  
    static random(): SearchInvestmentPortfoliosQuery {
        return this.create();
    }
}
  