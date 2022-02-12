import { EventBus } from "../../../../../Shared/Domain/Event/EventBus";
import { InvestmentPortfolioId } from "../../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocation } from "../../../Domain/Model/Allocation/InvestmentAllocation";
import { InvestmentPortfolioRepository } from "../../../Domain/Model/InvestmentPortfolioRepository";
import { InvestmentPortfolio } from "../../../Domain/Model/Portfolio/InvestmentPortfolio";

type Params = {
    id: InvestmentPortfolioId;
    allocations: InvestmentAllocation[];
};

export class InvestmentPortfolioCreator {
    private repository: InvestmentPortfolioRepository;
    private eventBus: EventBus;

    constructor(repository: InvestmentPortfolioRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run({ id, allocations }: Params): Promise<void> {
        const portfolio = InvestmentPortfolio.create(id, allocations);

        await this.repository.save(portfolio);
        await this.eventBus.publish(portfolio.pullDomainEvents());
    }
}
