import { CreateInvestmentOrderCommand } from '../../../../../../src/Contexts/Investment/Order/Application/Command/CreateOrder/CreateInvestmentOrderCommand';
import { InvestmentOrderId } from "../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderId";
import { InvestmentOrder } from "../../../../../../src/Contexts/Investment/Order/Domain/Model/InvestmentOrder";
import { InvestmentPortfolioId } from "../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentAllocationId } from "../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentAllocationId";
import { InvestmentShares } from "../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentShares";
import { InvestmentOrderType } from "../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderType";
import { InvestmentOrderStatus } from "../../../../../../src/Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderStatus";
import { InvestmentPortfolioIdMother } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother";
import { InvestmentAllocationMother } from "../../../Portfolio/Domain/Model/InvestmentAllocationMother";
import { InvestmentOrderIdMother } from "../ValueObject/InvestmentOrderIdMother";
import { InvestmentOrderTypeMother } from "../ValueObject/InvestmentOrderTypeMother";
import { InvestmentOrderStatusMother } from "../ValueObject/InvestmentOrderStatusMother";
import { InvestmentAllocation } from '../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocation';

export class InvestmentOrderMother {
  static create(
    id: InvestmentOrderId, 
    portfolioId: InvestmentPortfolioId,
    allocationId: InvestmentAllocationId,
    shares: InvestmentShares,
    type: InvestmentOrderType,
    status: InvestmentOrderStatus,
  ): InvestmentOrder {
    return new InvestmentOrder(
      id,
      portfolioId,
      allocationId,
      shares,
      type,
      status
    );
  }
  
  static fromCommand(command: CreateInvestmentOrderCommand): InvestmentOrder {
    const allocationDTO = InvestmentAllocationMother.create(command.allocationId, command.shares);
    const allocation = InvestmentAllocation.fromDTO(allocationDTO);

    return this.create(
      InvestmentOrderIdMother.create(command.id),
      InvestmentPortfolioIdMother.create(command.portfolioId),
      allocation.id,
      allocation.shares,
      InvestmentOrderTypeMother.create(command.type),
      InvestmentOrderStatusMother.pending()
    );
  }
  
  static random(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.random(),
      InvestmentOrderStatusMother.random(),
    );
  }

  static withPortfolioId(order: InvestmentOrder, portfolioId: InvestmentPortfolioId): InvestmentOrder {
    return this.create(
      order.id, 
      portfolioId, 
      order.allocationId, 
      order.shares, 
      order.type,
      order.status,
    );
  }

  static withAllocationId(order: InvestmentOrder, allocationId: InvestmentAllocationId): InvestmentOrder {
    return this.create(
      order.id, 
      order.portfolioId, 
      allocationId, 
      order.shares, 
      order.type,
      order.status,
    );
  }

  static completed(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.random(),
      InvestmentOrderStatusMother.completed(),
    );
  }

  static pending(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.random(),
      InvestmentOrderStatusMother.pending(),
    );
  }

  static sell(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.sell(),
      InvestmentOrderStatusMother.random(),
    );
  }

  static buy(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.buy(),
      InvestmentOrderStatusMother.random(),
    );
  }

  static completedSell(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.sell(),
      InvestmentOrderStatusMother.completed(),
    );
  }

  static pendingSell(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.sell(),
      InvestmentOrderStatusMother.pending(),
    );
  }

  static completedBuy(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.buy(),
      InvestmentOrderStatusMother.completed(),
    );
  }

  static pendingBuy(): InvestmentOrder {
    const allocation = InvestmentAllocationMother.random();

    return this.create(
      InvestmentOrderIdMother.random(), 
      InvestmentPortfolioIdMother.random(), 
      allocation.id, 
      allocation.shares, 
      InvestmentOrderTypeMother.buy(),
      InvestmentOrderStatusMother.pending(),
    );
  }
}
  