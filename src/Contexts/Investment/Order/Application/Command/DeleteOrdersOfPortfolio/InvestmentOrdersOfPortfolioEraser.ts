import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentOrderRepository } from '../../../Domain/Model/InvestmentOrderRepository';

type Params = {
    portfolioId: InvestmentPortfolioId;
};

export class InvestmentOrdersOfPortfolioEraser {
    private repository: InvestmentOrderRepository;

    constructor(
        repository: InvestmentOrderRepository,
    ) {
        this.repository = repository;
    }

    async run({ portfolioId }: Params): Promise<void> {
        const orders = await this.repository.getByPortfolioId(portfolioId);

        await Promise.all(orders.map(order => this.repository.delete(order.id)));
    }
}
