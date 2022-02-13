import { CreateInvestmentAllocationCommand } from '../../../../../../src/Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/CreateInvestmentAllocationCommand';
import { InvestmentAllocation } from '../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocation';
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
  
    static random(): InvestmentAllocation {
      const allocationDTO = this.randomDTO();

      return InvestmentAllocation.fromDTO(allocationDTO);
    }

    static randomDTO(): InvestmentAllocationDTO {
      return this.create(
        UuidMother.random(),
        NumberMother.random(),
      );
    }

    static fromCommand(command: CreateInvestmentAllocationCommand): InvestmentAllocation {
      const allocationDTO = this.create(
        command.allocationId,
        command.shares,
      );

      return InvestmentAllocation.fromDTO(allocationDTO);
    }
  }
  