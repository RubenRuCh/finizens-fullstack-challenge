import { QueryBus } from '../../../../Contexts/Shared/Domain/CQRS/Query/QueryBus';
import { Request, Response } from 'express';
import { InMemoryQueryBus } from '../../../../Contexts/Shared/Infraestructure/QueryBus/InMemoryQueryBus';
import { prepareQueryHandlers } from '../PortfoliosBackendApp';
import { CustomRequest } from '../../../../Contexts/Shared/Infraestructure/CustomRequest';
import { FindInvestmentPortfolioByIdQuery } from '../../../../Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioByIdQuery';
import { FindInvestmentPortfolioResponse } from '../../../../Contexts/Investment/Portfolio/Application/Query/FindPortfolio/FindInvestmentPortfolioResponse';

export class GetPortfolioController {

    private queryBus: QueryBus;

    constructor() {
        this.queryBus = new InMemoryQueryBus(prepareQueryHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {
        const customReq = new CustomRequest(req);

        const query = new FindInvestmentPortfolioByIdQuery(customReq.getRouteParam('portfolioId'));
        const queryResponse: FindInvestmentPortfolioResponse = await this.queryBus.ask(query);

        const portfolioDTO = queryResponse.portfolio.toDTO();
        res.status(200).send(portfolioDTO);
    }

}
