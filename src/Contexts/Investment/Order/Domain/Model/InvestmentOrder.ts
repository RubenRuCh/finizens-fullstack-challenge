import { AggregateRoot } from "../../../../Shared/Domain/AggregateRoot";
import { InvestmentOrderId } from "../ValueObject/InvestmentOrderId";
import { InvestmentAllocationId } from '../../../Shared/ValueObject/InvestmentAllocationId';
import { InvestmentPortfolioId } from '../../../Shared/ValueObject/InvestmentPortfolioId';
import { InvestmentShares } from "../../../Shared/ValueObject/InvestmentShares";
import { InvestmentOrderType } from "../ValueObject/InvestmentOrderType";
import { InvestmentOrderDTO } from "./InvestmentOrderDTO";
import { InvestmentOrderStatus } from "../ValueObject/InvestmentOrderStatus";
import { InvestmentOrderAlreadyCompletedException } from "../Exception/InvestmentOrderAlreadyCompletedException";
import { InvestmentOrderCompleted } from "../Event/Order/InvestmentOrderCompleted";
import { InvestmentOrderCreated } from "../Event/Order/InvestmentOrderCreated";

export class InvestmentOrder extends AggregateRoot {
    private _id: InvestmentOrderId;
    private _portfolioId: InvestmentPortfolioId;
    private _allocationId: InvestmentAllocationId;
    private _shares: InvestmentShares;
    private _type: InvestmentOrderType;
    private _status: InvestmentOrderStatus;

    constructor(
      id: InvestmentOrderId, 
      portfolioId: InvestmentPortfolioId,
      allocationId: InvestmentAllocationId,
      shares: InvestmentShares,
      type: InvestmentOrderType,
      status: InvestmentOrderStatus,
    ) {
      super();
      this._id = id;
      this._portfolioId = portfolioId;
      this._allocationId = allocationId;
      this._shares = shares;
      this._type = type;
      this._status = status;
    }

    static create(
      id: InvestmentOrderId, 
      portfolioId: InvestmentPortfolioId,
      allocationId: InvestmentAllocationId,
      shares: InvestmentShares,
      type: InvestmentOrderType,
      status: InvestmentOrderStatus
    ): InvestmentOrder {
      const order = new InvestmentOrder(id, portfolioId, allocationId, shares, type, status);
  
      order.record(new InvestmentOrderCreated({
        order: order.toDTO(),
      }));
  
      return order;
    }
    
    public get id(): InvestmentOrderId {
      return this._id;
    }

    public get portfolioId(): InvestmentPortfolioId {
      return this._portfolioId;
    }

    public get allocationId(): InvestmentAllocationId {
      return this._allocationId;
    }
    
    public get shares(): InvestmentShares {
      return this._shares;
    }

    public get type(): InvestmentOrderType {
      return this._type;
    }
    
    public get status(): InvestmentOrderStatus {
      return this._status;
    }

    public complete(): void {
      if(this.status.isCompleted) {
        throw new InvestmentOrderAlreadyCompletedException();
      }

      this._status = InvestmentOrderStatus.completed();

      this.record(new InvestmentOrderCompleted({
        order: this.toDTO(),
      }));
    }

    static fromDTO(plainData: InvestmentOrderDTO): InvestmentOrder {
      return new InvestmentOrder(
        new InvestmentOrderId(plainData.id),
        new InvestmentPortfolioId(plainData.portfolioId),
        new InvestmentAllocationId(plainData.allocationId),
        new InvestmentShares(plainData.shares),
        new InvestmentOrderType(plainData.type),
        new InvestmentOrderStatus(plainData.status),
      );
    }
  
    public toDTO(): InvestmentOrderDTO {
      return {
        id: this.id.value,
        portfolioId: this.portfolioId.value,
        allocationId: this.allocationId.value,
        shares: this.shares.value,
        type: this.type.value,
        status: this.status.value,
      };
    }
}
