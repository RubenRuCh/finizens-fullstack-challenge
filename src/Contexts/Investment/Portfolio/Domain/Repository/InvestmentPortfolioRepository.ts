import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentAllocation } from "../Model/Allocation/InvestmentAllocation";
import { InvestmentAllocationId } from "../Model/Allocation/InvestmentAllocationId";
import { InvestmentPortfolio } from "../Model/Portfolio/InvestmentPortfolio";
import { InvestmentPortfolioId } from "../Model/Portfolio/InvestmentPortfolioId";

export interface InvestmentPortfolioRepository {
    save: (portfolio: InvestmentPortfolio) => Promise<void>;
    getById: (portfolioId: InvestmentPortfolioId) => Promise<Nullable<InvestmentPortfolio>>;
    getAllocationById: (allocationId: InvestmentAllocationId) => Promise<Nullable<InvestmentAllocation>>;
    search: (criteria: Criteria) => Promise<InvestmentPortfolio[]>;
}
