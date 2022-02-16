import { InvestmentPortfolioDTO } from './../../Model/Portfolio/InvestmentPortfolioDTO';
import { InvestmentPortfolioEvent, InvestmentPortfolioEventBody } from './InvestmentPortfolioEvent';
import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';

export class InvestmentPortfolioCreated extends InvestmentPortfolioEvent {
    static readonly EVENT_NAME = `${InvestmentPortfolioEvent.BASE_EVENT_NAME}.created`;

    constructor({
        portfolio,
        eventId,
        occurredOn
    }: {
        portfolio: InvestmentPortfolioDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'created', portfolio, eventId, occurredOn });
    }

    static fromPrimitives(
        body: InvestmentPortfolioEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentPortfolioCreated({
            portfolio: body.portfolio,
            eventId,
            occurredOn
        });
    }
}
