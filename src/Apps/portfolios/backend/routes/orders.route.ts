import express, { Express, Router, Request, Response } from 'express';
import { AsyncHandler } from '../../../../Contexts/Shared/Infraestructure/AsyncHandler';
import { GetNonCompletedOrdersController } from '../controllers/orders/GetNonCompletedOrdersController';
import { PatchOrderController } from '../controllers/orders/PatchOrderController';
import { PostOrderController } from '../controllers/orders/PostOrderController';

export enum OrdersEndpoints {
    GetNonCompleted = '/non-completed/:portfolioId',
    CreateNew = '/',
    UpdateOne = '/:orderId',
}

const router: Router = express.Router();

router.get(
    OrdersEndpoints.GetNonCompleted,
    AsyncHandler((req: Request, res: Response) => (
      new GetNonCompletedOrdersController().run(req, res)
    )),
);

router.post(
    OrdersEndpoints.CreateNew,
    AsyncHandler((req: Request, res: Response) => (
      new PostOrderController().run(req, res)
    )),
);

router.patch(
    OrdersEndpoints.UpdateOne,
    AsyncHandler((req: Request, res: Response) => (
        new PatchOrderController().run(req, res)
    )),
);

export const register = (app: Express) => {
  app.use('/api/orders', router);
};
