import { Command } from '../../../../../Shared/Domain/CQRS/Command/Command';
import { DeleteInvestmentOrdersOfPortfolioRequest } from './DeleteInvestmentOrdersOfPortfolioRequest';

export class DeleteInvestmentOrdersOfPortfolioCommand extends Command {
    portfolioId: string;

    constructor({ portfolioId }: DeleteInvestmentOrdersOfPortfolioRequest) {
        super();
        this.portfolioId = portfolioId;
    }
}
