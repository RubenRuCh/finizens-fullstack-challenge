import { InvestmentAllocationDTO } from '../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocationDTO';
import { CreateInvestmentPortfolioCommand } from '../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommand';
import { InvestmentPortfolioIdMother } from '../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother';
import { InvestmentAllocationsMother } from '../Domain/Model/InvestmentAllocationsMother';

export class CreateInvestmentPortfolioCommandMother {
    static create(id: string, allocations: InvestmentAllocationDTO[]): CreateInvestmentPortfolioCommand {
        return new CreateInvestmentPortfolioCommand({ id, allocations });
    }
  
    static random(): CreateInvestmentPortfolioCommand {
        return this.create(
            InvestmentPortfolioIdMother.random().value, 
            InvestmentAllocationsMother.random().map(allocation => allocation.toDTO()),
        );
    }
  }
  