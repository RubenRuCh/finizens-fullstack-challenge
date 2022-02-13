import { CompleteInvestmentOrderCommand } from './../../../../../../../src/Contexts/Investment/Order/Application/Command/CompleteOrder/CompleteInvestmentOrderCommand';
import { InvestmentOrder } from '../../../../../../../src/Contexts/Investment/Order/Domain/Model/InvestmentOrder';
import { InvestmentOrderMother } from '../../../Domain/Model/InvestmentOrderMother';

export class CompleteInvestmentOrderCommandMother {
    static create(
        id: string, 
    ): CompleteInvestmentOrderCommand {
        return new CompleteInvestmentOrderCommand({ id });
    }

    static createFromOrder(order: InvestmentOrder): CompleteInvestmentOrderCommand {
        return this.create(
            order.id.value,
        );
    }
  
    static random(): CompleteInvestmentOrderCommand {
        return this.createFromOrder(InvestmentOrderMother.random());
    }
}
  