import { QueryBus } from '../../../../../Contexts/Shared/Domain/CQRS/Query/QueryBus';
import { Request, Response } from 'express';
import { InMemoryQueryBus } from '../../../../../Contexts/Shared/Infraestructure/QueryBus/InMemoryQueryBus';
import { prepareQueryHandlers } from '../../PortfoliosBackendApp';
import { SearchNonCompletedInvestmentOrdersByPortfolioIdQuery } from '../../../../../Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/SearchNonCompletedInvestmentOrdersByPortfolioIdQuery';
import { CustomRequest } from '../../../../../Contexts/Shared/Infraestructure/CustomRequest';
import { SearchInvestmentOrdersResponse } from '../../../../../Contexts/Investment/Order/Application/Query/SearchNonCompletedOrder/SearchInvestmentOrdersResponse';
import httpStatus from 'http-status';

export class GetNonCompletedOrdersController {

    private queryBus: QueryBus;

    constructor() {
        this.queryBus = new InMemoryQueryBus(prepareQueryHandlers());
    }

    public async run(req: Request, res: Response): Promise<void> {
        const customReq = new CustomRequest(req);

        const portfolioId = customReq.getRouteParam('portfolioId');
        const query = new SearchNonCompletedInvestmentOrdersByPortfolioIdQuery(portfolioId);
        const queryResponse: SearchInvestmentOrdersResponse = await this.queryBus.ask(query);

        res.status(httpStatus.OK).send(queryResponse.orders);
    }

}
