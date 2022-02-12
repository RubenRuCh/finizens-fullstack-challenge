import { InvestmentPortfolioCreated } from './../../Event/Portfolio/InvestmentPortfolioCreated';
import { InvestmentPortfolioCleared } from './../../Event/Portfolio/InvestmentPortfolioCleared';
import { InvestmentAllocation } from './../Allocation/InvestmentAllocation';
import { InvestmentPortfolioDTO } from './InvestmentPortfolioDTO';
import { AggregateRoot } from "../../../../../Shared/Domain/AggregateRoot";
import { InvestmentPortfolioId } from "../../../../Shared/ValueObject/InvestmentPortfolioId";
import { Nullable } from '../../../../../Shared/Domain/Nullable';
import { InvestmentShares } from '../../../../Shared/ValueObject/InvestmentShares';
import { InvestmentAllocationCreated } from '../../Event/Allocation/InvestmentAllocationCreated';
import { InvestmentAllocationUpdated } from '../../Event/Allocation/InvestmentAllocationUpdated';
import { InvestmentAllocationDeleted } from '../../Event/Allocation/InvestmentAllocationDeleted';
import { InvestmentPortfolioUpdated } from '../../Event/Portfolio/InvestmentPortfolioUpdated';
import { InvestmentAllocationId } from '../../../../Shared/ValueObject/InvestmentAllocationId';

export class InvestmentPortfolio extends AggregateRoot {
    private _id: InvestmentPortfolioId;
    private _allocations: InvestmentAllocation[];
  
    constructor(id: InvestmentPortfolioId, allocations: InvestmentAllocation[]) {
      super();
      this._id = id;
      this._allocations = allocations;
    }

    static create(id: InvestmentPortfolioId, allocations: InvestmentAllocation[]): InvestmentPortfolio {
      const portfolio = new InvestmentPortfolio(id, allocations);
  
      portfolio.record(new InvestmentPortfolioCreated({
        portfolio: portfolio.toDTO(),
      }));
  
      return portfolio;
    }
    
    public get id(): InvestmentPortfolioId {
      return this._id;
    }

    public get allocations(): InvestmentAllocation[] {
      return this._allocations;
    }

    public clear(): void {
      this._allocations = [];

      this.record(new InvestmentPortfolioCleared({
        portfolio: this.toDTO(),
      }));
    }

    public getAllocation(searchedAllocationId: InvestmentAllocationId): Nullable<InvestmentAllocation> {
      const searchedAllocation = this.allocations.find(allocation => allocation.id.isEqual(searchedAllocationId))

      return searchedAllocation ?? null;
    }

    public upsertAllocation(id: InvestmentAllocationId, shares: InvestmentShares): InvestmentAllocation {
      let searchedAllocation = this.getAllocation(id);

      const allocation = searchedAllocation 
        ? this.updateAllocation(searchedAllocation, shares) 
        : this.createAllocation(id, shares)
      ;

      return allocation;
    }

    private createAllocation(id: InvestmentAllocationId, shares: InvestmentShares): InvestmentAllocation {
      const allocation = new InvestmentAllocation(id, shares);
      this.allocations.push(allocation);

      this.record(new InvestmentAllocationCreated({
        aggregateId: this.id.value,
        allocation: allocation.toDTO(),
      }));

      this.record(new InvestmentPortfolioUpdated({
        portfolio: this.toDTO(),
      }));

      return allocation;
    }

    private updateAllocation(allocation: InvestmentAllocation, shares: InvestmentShares): InvestmentAllocation {
      allocation.update(shares);

      const allocations = [...this.allocations];

      const index = allocations.findIndex(allocationInArray => allocationInArray.id.isEqual(allocation.id));
      allocations[index] = allocation;

      this._allocations = allocations;

      this.record(new InvestmentAllocationUpdated({
        aggregateId: this.id.value,
        allocation: allocation.toDTO(),
      }));

      this.record(new InvestmentPortfolioUpdated({
        portfolio: this.toDTO(),
      }));

      return allocation;
    }

    public deleteAllocation(allocationId: InvestmentAllocationId): void {
      const searchedAllocation = this.getAllocation(allocationId);

      if(!searchedAllocation){
        return;
      }

      this._allocations = this._allocations.filter(allocation => !allocation.id.isEqual(allocationId));

      this.record(new InvestmentAllocationDeleted({
        aggregateId: this.id.value,
        allocation: searchedAllocation.toDTO(),
      }));

      this.record(new InvestmentPortfolioUpdated({
        portfolio: this.toDTO(),
      }));
    }

    static fromDTO(plainData: InvestmentPortfolioDTO): InvestmentPortfolio {
      return new InvestmentPortfolio(
        new InvestmentPortfolioId(plainData.id),
        plainData.allocations.map(plainAlocation => InvestmentAllocation.fromDTO(plainAlocation))
      );
    }
  
    public toDTO(): InvestmentPortfolioDTO {
      return {
        id: this.id.value,
        allocations: this.allocations.map(allocation => allocation.toDTO()),
      };
    }
}
