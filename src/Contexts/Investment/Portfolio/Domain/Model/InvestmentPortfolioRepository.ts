import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentAllocation } from "./Allocation/InvestmentAllocation";
import { InvestmentPortfolio } from "./Portfolio/InvestmentPortfolio";
import { InvestmentPortfolioId } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocationId } from "../../../Shared/Domain/ValueObject/InvestmentAllocationId";

export interface InvestmentPortfolioRepository {
    save: (portfolio: InvestmentPortfolio) => Promise<void>;
    getById: (portfolioId: InvestmentPortfolioId) => Promise<Nullable<InvestmentPortfolio>>;
    getAllocationById: (allocationId: InvestmentAllocationId) => Promise<Nullable<InvestmentAllocation>>;
    search: (criteria: Criteria) => Promise<InvestmentPortfolio[]>;
}
