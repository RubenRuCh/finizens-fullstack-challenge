import { InvestmentPortfolioDTO } from './../../Model/Portfolio/InvestmentPortfolioDTO';
import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';

export type InvestmentPortfolioEventBody = {
    readonly eventName: string;
    readonly portfolio: InvestmentPortfolioDTO;
};

export class InvestmentPortfolioEvent extends DomainEvent {
    static readonly BASE_EVENT_NAME = 'portfolio';

    readonly eventName: string;
    readonly portfolio: InvestmentPortfolioDTO;

    constructor({
        portfolio,
        eventName,
        eventId,
        occurredOn
    }: {
        portfolio: InvestmentPortfolioDTO;
        eventName: string;
        eventId?: string;
        occurredOn?: Date;
    }) {
        const buildedEventName = `${InvestmentPortfolioEvent.BASE_EVENT_NAME}.${eventName}`;
        super(buildedEventName, portfolio.id, eventId, occurredOn);

        this.portfolio = portfolio;
        this.eventName = buildedEventName;
    }

    toPrimitive(): InvestmentPortfolioEventBody {
        const { portfolio, eventName } = this;

        return {
            portfolio,
            eventName,
        };
    }
}
