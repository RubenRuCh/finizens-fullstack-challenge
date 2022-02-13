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
  
  // static fromCommand(command: CreateInvestmentOrderCommand): InvestmentOrder {
  //   return this.create(
  //     InvestmentOrderIdMother.create(command.id),
  //     InvestmentPortfolioIdMother.create(command.portfolioId),
  //     InvestmentAllocationIdMother.create(command.allocationId),
  //     InvestmentSharesMother.create(command.shares),
  //     InvestmentOrderTypeMother.create(command.type),
  //     InvestmentOrderStatusMother.create(command.status),
  //   );
  // }
  
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

  static sellCompleted(): InvestmentOrder {
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

  static sellPending(): InvestmentOrder {
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

  static buyCompleted(): InvestmentOrder {
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

  static buyPending(): InvestmentOrder {
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
  