import { InMemoryCommandBus } from './../../../../../Contexts/Shared/Infraestructure/CommandBus/InMemoryCommandBus';
import { CommandBus } from './../../../../../Contexts/Shared/Domain/CQRS/Command/CommandBus';
import { InvestmentOrderType } from './../../../../../Contexts/Investment/Order/Domain/ValueObject/InvestmentOrderType';
import { Request, Response } from 'express';
import { prepareCommandHandlers } from '../../PortfoliosBackendApp';
import { CustomRequest } from '../../../../../Contexts/Shared/Infraestructure/CustomRequest';
import httpStatus from 'http-status';
import { CreateInvestmentOrderCommand } from '../../../../../Contexts/Investment/Order/Application/Command/CreateOrder/CreateInvestmentOrderCommand';

export class PostOrderController {

    private commandBus: CommandBus;

    constructor() {
        this.commandBus = new InMemoryCommandBus(prepareCommandHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {
        const customReq = new CustomRequest(req);

        const orderId = customReq.getBodyParam('id');
        const portfolioId = customReq.getBodyParam('portfolio');
        const allocationId = customReq.getBodyParam('allocation');
        const shares = customReq.getBodyParam('shares');
        const type = customReq.getBodyParam('type');

        const command = new CreateInvestmentOrderCommand({
            id: orderId,
            portfolio: portfolioId,
            allocation: allocationId,
            shares,
            type
        });

        await this.commandBus.dispatch(command);

        const status = new InvestmentOrderType(type).isBuy
            ? httpStatus.CREATED
            : httpStatus.OK
        ;

        res.status(status).send();
    }
}
