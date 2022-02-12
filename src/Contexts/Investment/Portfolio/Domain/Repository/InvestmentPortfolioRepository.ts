import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentAllocation } from "../Model/Allocation/InvestmentAllocation";
import { InvestmentPortfolio } from "../Model/Portfolio/InvestmentPortfolio";
import { InvestmentPortfolioId } from "../../../Shared/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocationId } from "../../../Shared/ValueObject/InvestmentAllocationId";

export interface InvestmentPortfolioRepository {
    save: (portfolio: InvestmentPortfolio) => Promise<void>;
    getById: (portfolioId: InvestmentPortfolioId) => Promise<Nullable<InvestmentPortfolio>>;
    getAllocationById: (allocationId: InvestmentAllocationId) => Promise<Nullable<InvestmentAllocation>>;
    search: (criteria: Criteria) => Promise<InvestmentPortfolio[]>;
}
