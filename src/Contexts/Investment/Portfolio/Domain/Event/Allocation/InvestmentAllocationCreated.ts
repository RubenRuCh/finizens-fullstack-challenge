import { InvestmentAllocationEvent, InvestmentAllocationEventBody } from './InvestmentAllocationEvent';
import { DomainEvent } from "../../../../../Shared/Domain/Event/DomainEvent";
import { InvestmentAllocationDTO } from '../../Model/Allocation/InvestmentAllocationDTO';

export class InvestmentAllocationCreated extends InvestmentAllocationEvent {
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
