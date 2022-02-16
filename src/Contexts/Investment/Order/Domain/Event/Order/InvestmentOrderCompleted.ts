import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentOrderDTO } from '../../Model/InvestmentOrderDTO';
import { InvestmentOrderEvent, InvestmentOrderEventBody } from './InvestmentOrderEvent';

export class InvestmentOrderCompleted extends InvestmentOrderEvent {
    static readonly EVENT_NAME = `${InvestmentOrderEvent.BASE_EVENT_NAME}.completed`;

    constructor({
        order,
        eventId,
        occurredOn
    }: {
        order: InvestmentOrderDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'completed', order, eventId, occurredOn });
    }

    static fromPrimitives(
        body: InvestmentOrderEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentOrderCompleted({
            order: body.order,
            eventId,
            occurredOn
        });
    }
}
