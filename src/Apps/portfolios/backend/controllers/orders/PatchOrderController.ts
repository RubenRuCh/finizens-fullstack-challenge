
import { InMemoryCommandBus } from './../../../../../Contexts/Shared/Infraestructure/CommandBus/InMemoryCommandBus';
import { CommandBus } from './../../../../../Contexts/Shared/Domain/CQRS/Command/CommandBus';
import { Request, Response } from 'express';
import { prepareCommandHandlers } from '../../PortfoliosBackendApp';
import { CustomRequest } from '../../../../../Contexts/Shared/Infraestructure/CustomRequest';
import httpStatus from 'http-status';
import { InvestmentOrderStatus } from '../../../../../Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderStatus';
import { CompleteInvestmentOrderCommand } from '../../../../../Contexts/Investment/Order/Application/Command/CompleteOrder/CompleteInvestmentOrderCommand';

export class PatchOrderController {

    private commandBus: CommandBus;

    constructor() {
        this.commandBus = new InMemoryCommandBus(prepareCommandHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {
        const customReq = new CustomRequest(req);

        const orderId = customReq.getRouteParam('orderId');
        const status = customReq.getBodyParam('status');

        const requestedStatus = new InvestmentOrderStatus(status);

        if (requestedStatus.isCompleted) {
            const command = new CompleteInvestmentOrderCommand({
                id: orderId,
            });

            await this.commandBus.dispatch(command);
        }

        res.status(httpStatus.OK).send();
    }
}
