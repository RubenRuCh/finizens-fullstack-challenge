import { InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException } from './../../../Domain/Exception/InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException';
import { InvestmentAllocationNotFoundException } from './../../../../Portfolio/Domain/Exception/Allocation/InvestmentAllocationNotFoundException';
import { InvestmentAllocation } from './../../../../Portfolio/Domain/Model/Allocation/InvestmentAllocation';
import { EventBus } from '../../../../../Shared/Domain/Event/EventBus';
import { InvestmentAllocationId } from '../../../../Shared/Domain/ValueObject/InvestmentAllocationId';
import { InvestmentPortfolioId } from '../../../../Shared/Domain/ValueObject/InvestmentPortfolioId';
import { InvestmentShares } from '../../../../Shared/Domain/ValueObject/InvestmentShares';
import { InvestmentOrder } from '../../../Domain/Model/InvestmentOrder';
import { InvestmentOrderRepository } from '../../../Domain/Model/InvestmentOrderRepository';
import { InvestmentOrderId } from '../../../Domain/ValueObject/InvestmentOrderId';
import { InvestmentOrderType } from '../../../Domain/ValueObject/InvestmentOrderType';
import { InvestmentPortfolio } from '../../../../Portfolio/Domain/Model/Portfolio/InvestmentPortfolio';
import { FindInvestmentPortfolioByIdQueryHandler } from '../../../../Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQueryHandler';
import { FindInvestmentPortfolioByIdQuery } from '../../../../Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQuery';

type Params = {
    id: InvestmentOrderId;
    portfolioId: InvestmentPortfolioId;
    allocationId: InvestmentAllocationId;
    shares: InvestmentShares;
    type: InvestmentOrderType;
};

export class InvestmentOrderCreator {
    private repository: InvestmentOrderRepository;
    private findPortfolioByIdHandler: FindInvestmentPortfolioByIdQueryHandler;
    private eventBus: EventBus;

    constructor(
        repository: InvestmentOrderRepository,
        findPortfolioByIdHandler: FindInvestmentPortfolioByIdQueryHandler,
        eventBus: EventBus
    ) {
        this.repository = repository;
        this.findPortfolioByIdHandler = findPortfolioByIdHandler;
        this.eventBus = eventBus;
    }

    async run({ id, portfolioId, allocationId, shares, type }: Params): Promise<void> {
        if (type.isSell) {
            const allocation = await this.findAllocation(portfolioId, allocationId);
            this.ensureSellIsViable(allocation, shares);
        }

        const order = InvestmentOrder.create(
            id,
            portfolioId,
            allocationId,
            shares,
            type,
        );

        await this.repository.save(order);
        await this.eventBus.publish(order.pullDomainEvents());
    }

    private ensureSellIsViable(allocation: InvestmentAllocation, sharesToSell: InvestmentShares): void {
        const isSellViable = InvestmentOrder.isSellViable({
            sharesToSell,
            availableShares: allocation.shares
        });

        if (!isSellViable) {
            throw new InvestmentOrderCannotSellMoreSharesThanAvailableInAllocationException(sharesToSell.value.toString());
        }
    }

    private async findAllocation(portfolioId: InvestmentPortfolioId, allocationId: InvestmentAllocationId): Promise<InvestmentAllocation> {
        const portfolio = await this.findPortfolio(portfolioId);

        const allocation = portfolio.getAllocation(allocationId);

        if (!allocation) {
            throw new InvestmentAllocationNotFoundException(allocationId.value);
        }

        return allocation;
    }

    private async findPortfolio(portfolioId: InvestmentPortfolioId): Promise<InvestmentPortfolio> {
        const queryResponse = await this.findPortfolioByIdHandler.handle(new FindInvestmentPortfolioByIdQuery(portfolioId.value));

        return InvestmentPortfolio.fromDTO(queryResponse.portfolio);
    }
}
