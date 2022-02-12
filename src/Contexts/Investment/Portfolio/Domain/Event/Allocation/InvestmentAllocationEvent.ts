import { InvestmentAllocationDTO } from './../../Model/Allocation/InvestmentAllocationDTO';
import { DomainEvent } from "../../../../../Shared/Domain/Event/DomainEvent";

export type InvestmentAllocationEventBody = {
    readonly eventName: string;
    readonly aggregateId: string;
    readonly allocation: InvestmentAllocationDTO;
};

export class InvestmentAllocationEvent extends DomainEvent {
    static readonly BASE_EVENT_NAME = 'allocation';

    readonly eventName: string;
    readonly allocation: InvestmentAllocationDTO;

    constructor({
        aggregateId,
        allocation,
        eventName,
        eventId,
        occurredOn
    }: {
        aggregateId: string;
        allocation: InvestmentAllocationDTO;
        eventName: string;
        eventId?: string;
        occurredOn?: Date;
    }) {
        const buildedEventName = `${InvestmentAllocationEvent.BASE_EVENT_NAME}.${eventName}`;
        super(buildedEventName, aggregateId, eventId, occurredOn);
        
        this.allocation = allocation;
        this.eventName = buildedEventName;
    }

    toPrimitive(): InvestmentAllocationEventBody {
        const { allocation, aggregateId, eventName } = this;

        return {
            allocation,
            eventName,
            aggregateId,
        };
    }
}
