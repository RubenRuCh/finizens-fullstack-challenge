import express, { Express, Router, Request, Response } from 'express';
import { AsyncHandler } from '../../../../Contexts/Shared/Infraestructure/AsyncHandler';
import { GetPortfolioController } from '../controllers/portfolios/GetPortfolioController';
import { GetPortfoliosController } from '../controllers/portfolios/GetPortfoliosController';
import { PutPortfolioController } from '../controllers/portfolios/PutPortfolioController';

export enum PortfoliosEndpoints {
  GetAll = '/',
  GetOne = '/:portfolioId',
  PutOne = '/:portfolioId',
}

const router: Router = express.Router();

router.get(
  PortfoliosEndpoints.GetAll,
  AsyncHandler((req: Request, res: Response) => (
    new GetPortfoliosController().run(req, res)
  )),
);

router.get(
  PortfoliosEndpoints.GetOne,
  AsyncHandler((req: Request, res: Response) => (
    new GetPortfolioController().run(req, res)
  )),
);

router.put(
  PortfoliosEndpoints.PutOne,
  AsyncHandler((req: Request, res: Response) => (
      new PutPortfolioController().run(req, res)
  )),
);

export const register = (app: Express) => {
  app.use('/api/portfolios', router);
};
