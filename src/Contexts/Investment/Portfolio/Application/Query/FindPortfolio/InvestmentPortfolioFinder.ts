import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentPortfolioNotFoundException } from '../../../Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import { InvestmentPortfolioRepository } from '../../../Domain/Model/InvestmentPortfolioRepository';
import { FindInvestmentPortfolioResponse } from './FindInvestmentPortfolioResponse';

export class InvestmentPortfolioFinder {
  constructor(private repository: InvestmentPortfolioRepository) {}

  async run(portfolioId: InvestmentPortfolioId): Promise<FindInvestmentPortfolioResponse> {
    const portfolio = await this.repository.getById(portfolioId);

    if (!portfolio) {
      throw new InvestmentPortfolioNotFoundException(portfolioId.value);
    }

    return new FindInvestmentPortfolioResponse(portfolio.toDTO());
  }
}
