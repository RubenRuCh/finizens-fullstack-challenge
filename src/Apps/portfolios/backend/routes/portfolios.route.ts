import express, { Express, Router } from 'express';
import { AsyncHandler } from '../../../../Contexts/Shared/Infraestructure/AsyncHandler';

export enum PortfoliosEndpoints {
    GetMetadaFromAll = '/',
    GetOne = '/:portfolioId',
    PutOne = '/:portfolioId',
};

const router: Router = express.Router();

router.get(
    PortfoliosEndpoints.GetMetadaFromAll,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
    //   new GetPortfoliosMetadataController().run(req, res)
    )),
);

router.get(
    PortfoliosEndpoints.GetOne,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
    //   new GetPortfolioController().run(req, res)
    )),
);

router.put(
    PortfoliosEndpoints.PutOne,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
        // new PutPortfolioController().run(req, res)
    )),
);

export const register = (app: Express) => {
  app.use('/api/portfolios', router);
};
