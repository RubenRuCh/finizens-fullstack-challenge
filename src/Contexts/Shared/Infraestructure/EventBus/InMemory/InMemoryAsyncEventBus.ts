import { DomainEvent } from "../../../Domain/Event/DomainEvent";
import { DomainEventMapping } from "../../../Domain/Event/DomainEventMapping";
import { DomainEventSubscriber } from "../../../Domain/Event/DomainEventSubscriber";
import { EventBus } from "../../../Domain/Event/EventBus";
import { EventEmitterBus } from "../EventEmitterBus";

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async start(): Promise<void> {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}
}
