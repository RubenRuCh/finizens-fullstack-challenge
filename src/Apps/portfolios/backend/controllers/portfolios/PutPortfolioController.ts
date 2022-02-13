import httpStatus from 'http-status';
import { InMemoryCommandBus } from './../../../../../Contexts/Shared/Infraestructure/CommandBus/InMemoryCommandBus';
import { CommandBus } from '../../../../../Contexts/Shared/Domain/CQRS/Command/CommandBus';
import { Request, Response } from 'express';
import { prepareCommandHandlers } from '../../PortfoliosBackendApp';
import { CustomRequest } from '../../../../../Contexts/Shared/Infraestructure/CustomRequest';
import { CreateInvestmentPortfolioCommand } from '../../../../../Contexts/Investment/Portfolio/Application/Command/CreatePortfolio/CreateInvestmentPortfolioCommand';

export class PutPortfolioController {

    private commandBus: CommandBus;

    constructor() {
        this.commandBus = new InMemoryCommandBus(prepareCommandHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {
        const customReq = new CustomRequest(req);

        const portfolioId = customReq.getRouteParam('portfolioId');
        const allocations = customReq.getBodyParam('allocations');

        const command = new CreateInvestmentPortfolioCommand({ id: portfolioId, allocations });
        await this.commandBus.dispatch(command);

        res.status(httpStatus.OK).send();
    }

}
