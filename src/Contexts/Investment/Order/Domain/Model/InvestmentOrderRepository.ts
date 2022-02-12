import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentPortfolioId } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentOrderId } from "../ValueObject/InvestmentOrderId";
import { InvestmentOrder } from "./InvestmentOrder";


export interface InvestmentOrderRepository {
    save: (order: InvestmentOrder) => Promise<void>;
    remove: (orderId: InvestmentOrderId) => Promise<void>;
    getById: (orderId: InvestmentOrderId) => Promise<Nullable<InvestmentOrder>>;
    getByPortfolioId: (portfolioId: InvestmentPortfolioId) => Promise<InvestmentOrder[]>;
    search: (criteria: Criteria) => Promise<InvestmentOrder[]>;
}
