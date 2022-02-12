import { CreateInvestmentAllocationCommand } from '../../../../../src/Contexts/Investment/Portfolio/Application/Command/UpsertAllocation/CreateInvestmentAllocationCommand';
import { InvestmentPortfolioIdMother } from '../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother';
import { InvestmentAllocationMother } from '../Domain/Model/InvestmentAllocationMother';

export class CreateInvestmentAllocationCommandMother {
    static create(
        portfolioId: string, 
        allocationId: string, 
        shares: number,
    ): CreateInvestmentAllocationCommand {
        return new CreateInvestmentAllocationCommand({ portfolioId, allocationId, shares });
    }
  
    static random(): CreateInvestmentAllocationCommand {
        const randomAllocation = InvestmentAllocationMother.random();

        return this.create(
            InvestmentPortfolioIdMother.random().value, 
            randomAllocation.id,
            randomAllocation.shares,
        );
    }
  }
  