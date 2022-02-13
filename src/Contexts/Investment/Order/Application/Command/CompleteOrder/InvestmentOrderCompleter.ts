import { EventBus } from '../../../../../Shared/Domain/Event/EventBus';
import { InvestmentOrderNotFoundException } from '../../../Domain/Exception/InvestmentOrderNotFoundException';
import { InvestmentOrderRepository } from '../../../Domain/Model/InvestmentOrderRepository';
import { InvestmentOrderId } from '../../../Domain/ValueObject/InvestmentOrderId';

type Params = {
    id: InvestmentOrderId;
};

export class InvestmentOrderCompleter {
    private repository: InvestmentOrderRepository;
    private eventBus: EventBus;

    constructor(
        repository: InvestmentOrderRepository,
        eventBus: EventBus
    ) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run({ id }: Params): Promise<void> {
        const order = await this.repository.getById(id);

        if (!order) {
            throw new InvestmentOrderNotFoundException(id.value);
        }

        order.complete();

        await this.repository.save(order);
        await this.eventBus.publish(order.pullDomainEvents());
    }

}
