import { InvestmentAllocationDTO } from './InvestmentAllocationDTO';
import { InvestmentShares } from "../../../../Shared/ValueObject/InvestmentShares";
import { InvestmentAllocationId } from '../../../../Shared/ValueObject/InvestmentAllocationId';

export class InvestmentAllocation {
    private _id: InvestmentAllocationId;
    private _shares: InvestmentShares;
  
    constructor(id: InvestmentAllocationId, shares: InvestmentShares) {
      this._id = id;
      this._shares = shares;
    }

    public get id(): InvestmentAllocationId {
      return this._id;
    }

    public get shares(): InvestmentShares {
      return this._shares;
    }

    public update(shares: InvestmentShares): InvestmentAllocation {
      this._shares = shares;

      return this;
    }

    static fromDTO(plainData: InvestmentAllocationDTO): InvestmentAllocation {
      return new InvestmentAllocation(
        new InvestmentAllocationId(plainData.id),
        new InvestmentShares(plainData.shares)
      );
    }
  
    toDTO(): InvestmentAllocationDTO {
      return {
        id: this.id.value,
        shares: this.shares.value,
      };
    }
}
