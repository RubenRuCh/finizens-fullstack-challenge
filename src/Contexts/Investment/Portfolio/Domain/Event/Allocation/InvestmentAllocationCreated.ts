import { InvestmentAllocationEvent, InvestmentAllocationEventBody } from './InvestmentAllocationEvent';
import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentAllocationDTO } from '../../Model/Allocation/InvestmentAllocationDTO';

export class InvestmentAllocationCreated extends InvestmentAllocationEvent {
    static readonly EVENT_NAME = `${InvestmentAllocationEvent.BASE_EVENT_NAME}.created`;

    constructor({
        aggregateId,
        allocation,
        eventId,
        occurredOn
    }: {
        aggregateId: string;
        allocation: InvestmentAllocationDTO;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super({ eventName: 'created', aggregateId, allocation, eventId, occurredOn });
    }

    static fromPrimitives(
        aggregateId: string,
        body: InvestmentAllocationEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentAllocationCreated({
            aggregateId,
            allocation: body.allocation,
            eventId,
            occurredOn
        });
    }
}
