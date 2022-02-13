import { CreateInvestmentPortfolioCommand } from "../../../../../../src/Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommand";
import { InvestmentAllocation } from "../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Allocation/InvestmentAllocation";
import { InvestmentPortfolio } from "../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolio";
import { InvestmentPortfolioId } from "../../../../../../src/Contexts/Investment/Shared/Domain/ValueObject/InvestmentPortfolioId";
import { InvestmentPortfolioIdMother } from "../../../Shared/Domain/ValueObject/InvestmentPortfolioIdMother";
import { InvestmentAllocationsMother } from "./InvestmentAllocationsMother";

export class InvestmentPortfolioMother {
    static create(id: InvestmentPortfolioId, allocations: InvestmentAllocation[]): InvestmentPortfolio {
      return new InvestmentPortfolio(id, allocations);
    }
  
    static fromCommand(command: CreateInvestmentPortfolioCommand): InvestmentPortfolio {
      return this.create(
        InvestmentPortfolioIdMother.create(command.id),
        command.allocations.map(allocationDTO => InvestmentAllocation.fromDTO(allocationDTO)),
      );
    }
  
    static random(): InvestmentPortfolio {
      return this.create(
          InvestmentPortfolioIdMother.random(), 
          InvestmentAllocationsMother.random(), 
        );
    }
  }
  