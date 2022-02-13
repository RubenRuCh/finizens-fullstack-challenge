import { Command } from '../../../../../Shared/Domain/CQRS/Command/Command';
import { CompleteInvestmentOrderRequest } from './CompleteInvestmentOrderRequest';

export class CompleteInvestmentOrderCommand extends Command {
    id: string;

    constructor({ id }: CompleteInvestmentOrderRequest) {
        super();
        this.id = id;
    }
}
