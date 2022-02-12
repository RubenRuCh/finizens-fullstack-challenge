import express, { Express, Router } from 'express';
import { AsyncHandler } from '../../../../Contexts/Shared/Infraestructure/AsyncHandler';

export enum OrdersEndpoints {
    GetNonCompleted = '/non-completed/:portfolioId',
    CreateNew = '/',
    UpdateOne = '/:orderId',
};

const router: Router = express.Router();

router.get(
    OrdersEndpoints.GetNonCompleted,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
    //   new GetNonCompletedOrdersController().run(req, res)
    )),
);

router.post(
    OrdersEndpoints.CreateNew,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
    //   new PostOrderController().run(req, res)
    )),
);


router.patch(
    OrdersEndpoints.UpdateOne,
    AsyncHandler((req: Request, res: Response) => (
        console.log(req)
        // new PatchOrderController().run(req, res)
    )),
);

export const register = (app: Express) => {
  app.use('/api/orders', router);
};
