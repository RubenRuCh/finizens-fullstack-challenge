import httpStatus from 'http-status';
import glob from 'glob';
import { NextFunction, Router, Response, Request } from 'express';
import { ExceptionHandler } from '../../../../Contexts/Shared/Infraestructure/ExceptionHandler';

export function registerRoutes(router: Router) {

    router.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
        ExceptionHandler(error, res);
        next();
    });

    router.get('/api', (_req, res) => {
        res.send({ message: 'Welcome to Finizens API!' });
    });

    const routes = glob.sync(__dirname + '/**/*.route.*');
    routes.map(route => register(route, router));

    router.get('*', (_req, res) => {
        res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    });
}

function register(routePath: string, router: Router) {
    const route = require(routePath);
    route.register(router);
}
