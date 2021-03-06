import { EventBus } from '../../../../../Shared/Domain/Event/EventBus';
import { InvestmentAllocationId } from '../../../../Shared/Domain/ValueObject/InvestmentAllocationId';
import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentPortfolioNotFoundException } from '../../../Domain/Exception/Portfolio/InvestmentPortfolioNotFoundException';
import { InvestmentPortfolioRepository } from '../../../Domain/Model/InvestmentPortfolioRepository';

type Params = {
    portfolioId: InvestmentPortfolioId;
    allocationId: InvestmentAllocationId;
};

export class InvestmentAllocationEraser {
    private repository: InvestmentPortfolioRepository;
    private eventBus: EventBus;

    constructor(repository: InvestmentPortfolioRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run({ portfolioId, allocationId }: Params): Promise<void> {
        const portfolio = await this.repository.getById(portfolioId);

        if (!portfolio) {
            throw new InvestmentPortfolioNotFoundException(portfolioId.value);
        }

        portfolio.deleteAllocation(allocationId);

        await this.repository.save(portfolio);
        await this.eventBus.publish(portfolio.pullDomainEvents());
    }
}
