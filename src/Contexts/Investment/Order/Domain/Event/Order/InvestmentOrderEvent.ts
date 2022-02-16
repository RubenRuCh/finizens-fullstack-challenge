import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentOrderDTO } from '../../Model/InvestmentOrderDTO';

export type InvestmentOrderEventBody = {
    readonly eventName: string;
    readonly order: InvestmentOrderDTO;
};

export class InvestmentOrderEvent extends DomainEvent {
    static readonly BASE_EVENT_NAME = 'order';

    readonly eventName: string;
    readonly order: InvestmentOrderDTO;

    constructor({
        order,
        eventName,
        eventId,
        occurredOn
    }: {
        order: InvestmentOrderDTO;
        eventName: string;
        eventId?: string;
        occurredOn?: Date;
    }) {
        const buildedEventName = `${InvestmentOrderEvent.BASE_EVENT_NAME}.${eventName}`;
        super(buildedEventName, order.id, eventId, occurredOn);

        this.order = order;
        this.eventName = buildedEventName;
    }

    get EVENT_NAME(): string {
        return this.eventName;
    }

    toPrimitive(): InvestmentOrderEventBody {
        const { order, eventName } = this;

        return {
            order,
            eventName,
        };
    }
}
