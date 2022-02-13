import { InvestmentAllocationsMother } from './../../../../../../tests/Contexts/Investment/Portfolio/Domain/Model/InvestmentAllocationsMother';
import { InvestmentPortfolio } from './../../Domain/Model/Portfolio/InvestmentPortfolio';
import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentPortfolioId } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentPortfolioRepository } from "../../Domain/Model/InvestmentPortfolioRepository";

export const initialPortfolioId = new InvestmentPortfolioId('1828749d-09e9-472b-9273-0ef9196bfc66')
const initialAllocations = InvestmentAllocationsMother.random();
const initialPortfolio = new InvestmentPortfolio(initialPortfolioId, initialAllocations);

export class InMemoryInvestmentPortfolioRepository implements InvestmentPortfolioRepository {
    private static portfolios: InvestmentPortfolio[] = [initialPortfolio];

    public async save(portfolioToSave: InvestmentPortfolio): Promise<void> {
        const searchedPortfolio = await this.getById(portfolioToSave.id);

        if (!searchedPortfolio) {
            InMemoryInvestmentPortfolioRepository.portfolios.push(portfolioToSave);
            return;
        }

        const portfolios = [...InMemoryInvestmentPortfolioRepository.portfolios];

        const index = portfolios.findIndex(portfolio => portfolio.id.isEqual(portfolioToSave.id));
        portfolios[index] = portfolioToSave;
        
        InMemoryInvestmentPortfolioRepository.portfolios = portfolios;
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
