import { InvestmentPortfolio } from './../../../../../../../src/Contexts/Investment/Portfolio/Domain/Model/Portfolio/InvestmentPortfolio';
import { DeleteInvestmentOrdersOfPortfolioCommand } from '../../../../../../../src/Contexts/Investment/Order/Application/Command/DeleteOrdersOfPortfolio/DeleteInvestmentOrdersOfPortfolioCommand';
import { InvestmentPortfolioMother } from '../../../../Portfolio/Domain/Model/InvestmentPortfolioMother';

export class DeleteInvestmentOrdersOfPortfolioCommandMother {
    static create(
        portfolioId: string, 
    ): DeleteInvestmentOrdersOfPortfolioCommand {
        return new DeleteInvestmentOrdersOfPortfolioCommand({ portfolioId });
    }

    static createFromPortfolio(portfolio: InvestmentPortfolio): DeleteInvestmentOrdersOfPortfolioCommand {
        return this.create(
            portfolio.id.value,
        );
    }
  
    static random(): DeleteInvestmentOrdersOfPortfolioCommand {
        return this.createFromPortfolio(InvestmentPortfolioMother.random());
    }
}
  