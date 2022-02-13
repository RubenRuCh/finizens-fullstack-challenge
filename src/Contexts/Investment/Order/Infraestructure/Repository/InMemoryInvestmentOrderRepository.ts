import { InvestmentOrderMother } from './../../../../../../tests/Contexts/Investment/Order/Domain/Model/InvestmentOrderMother';
import { InvestmentOrderNotFoundException } from './../../Domain/Exception/InvestmentOrderNotFoundException';
import { Criteria } from "../../../../Shared/Domain/Criteria/Criteria";
import { Nullable } from "../../../../Shared/Domain/Nullable";
import { InvestmentPortfolioId } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentOrder } from "../../Domain/Model/InvestmentOrder";
import { InvestmentOrderRepository } from "../../Domain/Model/InvestmentOrderRepository";
import { InvestmentOrderId } from "../../Domain/ValueObject/InvestmentOrderId";
import { initialPortfolioId } from '../../../Portfolio/Infraestructure/Repository/InMemoryInvestmentPortfolioRepository';

const initialPendingSellOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.pendingSell(), initialPortfolioId);
const initialCompletedSellOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.completedSell(), initialPortfolioId);

const initialPendingBuyOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.pendingBuy(), initialPortfolioId);
const initialCompletedBuyOrder = InvestmentOrderMother.withPortfolioId(InvestmentOrderMother.completedBuy(), initialPortfolioId);

const initialOrders = [
    initialPendingSellOrder,
    initialCompletedSellOrder,
    initialPendingBuyOrder,
    initialCompletedBuyOrder
];

export class InMemoryInvestmentOrderRepository implements InvestmentOrderRepository {
    private static orders: InvestmentOrder[] = initialOrders;

    public async save(orderToSave: InvestmentOrder): Promise<void> {
        const searchedOrder = await this.getById(orderToSave.id);

        if (!searchedOrder) {
            InMemoryInvestmentOrderRepository.orders.push(orderToSave);
            return;
        }

        const orders = [...InMemoryInvestmentOrderRepository.orders];

        const index = orders.findIndex(order => order.id.isEqual(orderToSave.id));
        orders[index] = orderToSave;
        
        InMemoryInvestmentOrderRepository.orders = orders;
    }

    public async delete(orderId: InvestmentOrderId): Promise<void> {
        const searchedOrder = await this.getById(orderId);

        if (!searchedOrder) {
            throw new InvestmentOrderNotFoundException(orderId.value);
        }

        const orders = [...InMemoryInvestmentOrderRepository.orders];

        const index = orders.findIndex(order => order.id.isEqual(orderId));
        const updatedOrders = orders.slice(index, 1);

        InMemoryInvestmentOrderRepository.orders = updatedOrders;
    }

    public async search(_criteria: Criteria): Promise<InvestmentOrder[]> {
        // TODO Implement Criteria pattern
        return InMemoryInvestmentOrderRepository.orders;
    }

    public async getByPortfolioId(portfolioId: InvestmentPortfolioId): Promise<InvestmentOrder[]> {
        return InMemoryInvestmentOrderRepository.orders.filter(order => order.portfolioId.isEqual(portfolioId));
    }

    public async getById(orderId: InvestmentOrderId): Promise<Nullable<InvestmentOrder>> {
        const order = InMemoryInvestmentOrderRepository.orders.find(order => order.id.isEqual(orderId));

        if (!order) {
            return null;
        }

        const clonedOrder = new InvestmentOrder(
            order.id,
            order.portfolioId,
            order.allocationId,
            order.shares,
            order.type,
            order.status
        );

        return clonedOrder;
    }

}
