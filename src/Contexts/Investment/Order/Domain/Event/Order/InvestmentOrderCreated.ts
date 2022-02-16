import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentOrderDTO } from '../../Model/InvestmentOrderDTO';
import { InvestmentOrderEvent, InvestmentOrderEventBody } from './InvestmentOrderEvent';

export class InvestmentOrderCreated extends InvestmentOrderEvent {
    static readonly EVENT_NAME = `${InvestmentOrderEvent.BASE_EVENT_NAME}.created`;

    constructor({
        order,
        eventId,
        occurredOn
    }: {
        order: InvestmentOrderDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'created', order, eventId, occurredOn });
    }

    static fromPrimitives(
        body: InvestmentOrderEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentOrderCreated({
            order: body.order,
            eventId,
            occurredOn
        });
    }
}
