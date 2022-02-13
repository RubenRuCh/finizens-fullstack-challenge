import { DomainEvent } from '../../../../../Shared/Domain/Event/DomainEvent';
import { InvestmentAllocationDTO } from '../../Model/Allocation/InvestmentAllocationDTO';
import { InvestmentAllocationEvent, InvestmentAllocationEventBody } from './InvestmentAllocationEvent';

export class InvestmentAllocationUpdated extends InvestmentAllocationEvent {
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
        super({ eventName: 'updated', aggregateId, allocation, eventId, occurredOn });
    }

    static fromPrimitives(
        aggregateId: string,
        body: InvestmentAllocationEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new InvestmentAllocationUpdated({
            aggregateId,
            allocation: body.allocation,
            eventId,
            occurredOn
        });
    }
}
