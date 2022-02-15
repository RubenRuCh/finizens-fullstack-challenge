import { InvestmentPortfolioDTO } from './../../Model/Portfolio/InvestmentPortfolioDTO';
import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentPortfolioEvent, InvestmentPortfolioEventBody } from './InvestmentPortfolioEvent';

export class InvestmentPortfolioUpdated extends InvestmentPortfolioEvent {
    static readonly EVENT_NAME = `${InvestmentPortfolioEvent.BASE_EVENT_NAME}.updated`;

    constructor({
        portfolio,
        eventId,
        occurredOn
    }: {
        portfolio: InvestmentPortfolioDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'updated', portfolio, eventId, occurredOn });
    }

    static fromPrimitives(
        body: InvestmentPortfolioEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentPortfolioUpdated({
            portfolio: body.portfolio,
            eventId,
            occurredOn
        });
    }
}
