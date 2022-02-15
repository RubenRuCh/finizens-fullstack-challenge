import { InvestmentPortfolioDTO } from '../../Model/Portfolio/InvestmentPortfolioDTO';
import { InvestmentPortfolioEvent, InvestmentPortfolioEventBody } from './InvestmentPortfolioEvent';
import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';

export class InvestmentPortfolioCleared extends InvestmentPortfolioEvent {
    static readonly EVENT_NAME = `${InvestmentPortfolioEvent.BASE_EVENT_NAME}.cleared`;

    constructor({
        portfolio,
        eventId,
        occurredOn
    }: {
        portfolio: InvestmentPortfolioDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'cleared', portfolio, eventId, occurredOn });
    }

    static fromPrimitives(
        body: InvestmentPortfolioEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentPortfolioCleared({
            portfolio: body.portfolio,
            eventId,
            occurredOn
        });
    }
}
