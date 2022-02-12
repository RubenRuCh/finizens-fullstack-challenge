import { InvestmentAllocationDTO } from '../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocationDTO';
import { InvestmentAllocationMother } from './InvestmentAllocationMother';

export class InvestmentAllocationsMother {
  static random(): InvestmentAllocationDTO[] {
    const minAllocations = 0;
    const maxAllocations = 20;

    const numberOfAllocations = Math.floor(Math.random() * (maxAllocations - minAllocations + 1) + minAllocations);

    let allocations = [];
    
    for (let index = 0; index < numberOfAllocations; index++) {
      allocations.push(InvestmentAllocationMother.random());
    }

    return allocations;
  }
}
  