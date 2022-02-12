import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router) {

    const message = 'Welcome to Finizens API!';

    router.get('/api', (_req, res) => {
        res.send({ message });
    });

    const routes = glob.sync(__dirname + '/**/*.route.*');
    routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
    const route = require(routePath);
    route.register(router);
}
