import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentPortfolioId } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentPortfolioRepository } from "../../Domain/Model/InvestmentPortfolioRepository";
import { InvestmentPortfolio } from "../../Domain/Model/Portfolio/InvestmentPortfolio";

export class InMemoryInvestmentPortfolioRepository implements InvestmentPortfolioRepository {
    private static portfolios: InvestmentPortfolio[] = [];

    public async save(portfolio: InvestmentPortfolio): Promise<void> {
        InMemoryInvestmentPortfolioRepository.portfolios.push(portfolio);
    }

    public async search(_criteria: Criteria): Promise<InvestmentPortfolio[]> {
        // TODO Implement Criteria pattern
        return InMemoryInvestmentPortfolioRepository.portfolios;
    }

    public async getById(portfolioId: InvestmentPortfolioId): Promise<Nullable<InvestmentPortfolio>> {
        const portfolio = InMemoryInvestmentPortfolioRepository.portfolios.find(portfolio => portfolio.id.isEqual(portfolioId));

        if (!portfolio) {
            return null;
        }

        const clonedPortfolio = new InvestmentPortfolio(
            portfolio.id,
            portfolio.allocations
        );

        return clonedPortfolio;
    }

}
