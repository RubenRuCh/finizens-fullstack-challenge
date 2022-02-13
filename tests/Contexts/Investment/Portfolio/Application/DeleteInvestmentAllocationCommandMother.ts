import { DeleteInvestmentAllocationCommand } from '../../../../../src/Contexts/Investment/Portfolio/Application/Command/DeleteAllocation/DeleteInvestmentAllocationCommand';
import { InvestmentPortfolioIdMother } from '../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother';
import { InvestmentAllocationMother } from '../Domain/Model/InvestmentAllocationMother';

export class DeleteInvestmentAllocationCommandMother {
    static create(
        portfolioId: string, 
        allocationId: string, 
    ): DeleteInvestmentAllocationCommand {
        return new DeleteInvestmentAllocationCommand({ portfolioId, allocationId });
    }
  
    static random(): DeleteInvestmentAllocationCommand {
        const randomAllocation = InvestmentAllocationMother.random();

        return this.create(
            InvestmentPortfolioIdMother.random().value, 
            randomAllocation.id.value,
        );
    }
  }
  