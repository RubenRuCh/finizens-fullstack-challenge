import { InvestmentOrder } from './../../../../../../../src/Contexts/Investment/Order/Domain/Model/InvestmentOrder';
import { CreateInvestmentOrderCommand } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/CreateOrder/CreateInvestmentOrderCommand';
import { InvestmentOrderTypeValue } from '../../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderType';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';

export class CreateInvestmentOrderCommandMother {
    static create(
        id: string, 
        portfolioId: string,
        allocationId: string,
        shares: number,
        type: InvestmentOrderTypeValue,
    ): CreateInvestmentOrderCommand {
        return new CreateInvestmentOrderCommand({ id, portfolio: portfolioId, allocation: allocationId, shares, type });
    }

    static createFromOrder(order: InvestmentOrder): CreateInvestmentOrderCommand {
        return this.create(
            order.id.value,
            order.portfolioId.value,
            order.allocationId.value,
            order.shares.value,
            order.type.value,
        );
    }
  
    static random(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.random());
    }

    static buy(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.buy());
    }

    static sell(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.sell());
    }

    static pending(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.pending());
    }

    static completed(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.completed());
    }

    static completedBuy(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.completedBuy());
    }

    static completedSell(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.completedSell());
    }

    static pendingBuy(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.pendingBuy());
    }

    static pendingSell(): CreateInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.pendingSell());
    }
}
  