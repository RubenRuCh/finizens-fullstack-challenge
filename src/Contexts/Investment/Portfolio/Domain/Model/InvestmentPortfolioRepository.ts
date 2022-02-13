import { Criteria } from '../../../../Shared/Domain/Criteria/Criteria';
import { Nullable } from '../../../../Shared/Domain/Nullable';
import { InvestmentPortfolio } from './Portfolio/InvestmentPortfolio';
import { InvestmentPortfolioId } from '../../../Shared/Domain/ValueObject/InvestmentPortfolioId';

export interface InvestmentPortfolioRepository {
    save(portfolio: InvestmentPortfolio): Promise<void>;
    getById(portfolioId: InvestmentPortfolioId): Promise<Nullable<InvestmentPortfolio>>;
    search(criteria: Criteria): Promise<InvestmentPortfolio[]>;
}
