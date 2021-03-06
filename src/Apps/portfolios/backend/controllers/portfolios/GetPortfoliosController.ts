import { QueryBus } from '../../../../../Contexts/Shared/Domain/CQRS/Query/QueryBus';
import { Request, Response } from 'express';
import { InMemoryQueryBus } from '../../../../../Contexts/Shared/Infraestructure/QueryBus/InMemoryQueryBus';
import { prepareQueryHandlers } from '../../PortfoliosBackendApp';
import { SearchInvestmentPortfoliosQuery } from '../../../../../Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/SearchInvestmentPortfoliosQuery';
import { SearchInvestmentPortfoliosResponse } from '../../../../../Contexts/Investment/Portfolio/Application/Query/SearchPortfolios/SearchInvestmentPortfoliosResponse';
import httpStatus from 'http-status';

export class GetPortfoliosController {

    private queryBus: QueryBus;

    constructor() {
        this.queryBus = new InMemoryQueryBus(prepareQueryHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {

        const query = new SearchInvestmentPortfoliosQuery();
        const queryResponse: SearchInvestmentPortfoliosResponse = await this.queryBus.ask(query);

        res.status(httpStatus.OK).send(queryResponse.portfolios);
    }

}
