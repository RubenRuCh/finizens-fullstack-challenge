import { InvestmentAllocationDTO } from '../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocationDTO';
import { NumberMother } from '../../../../Shared/Domain/ValueObject/NumberMother';
import { UuidMother } from '../../../../Shared/Domain/ValueObject/UuidMother';

export class InvestmentAllocationMother {
    static create(id: string, shares: number): InvestmentAllocationDTO {
      return {
        id,
        shares
      };
    }
  
    static creator() {
      return () => InvestmentAllocationMother.random();
    }
  
    static random(): InvestmentAllocationDTO {
      return this.create(
        UuidMother.random(),
        NumberMother.random(),
      );
    }
  }
  