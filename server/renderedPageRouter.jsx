import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import Router from 'express';

import Routes from '../src/Routes.jsx'
import template from './template';

const renderedPageRouter = new Router();

const routes = [
    '/',
    '/issues',
    '/issues/:id'
];

const NoMatch = () => <p>Page Not Found</p>;

renderedPageRouter.get('*', (req, res) => {
    const match = routes.reduce((acc, route) => (
        matchPath(req.url, route, ({ exact: true }) || acc, null)))
    if (!match) {
        res.status(404).send(renderToString(<NoMatch />));
        return;
    }

    fetch(`http://localhost:3000/api${req.url}`)
        .then((response) => (response.json))
        .then((data) => {
            const initialState = { data };
            const html = renderToString(
                <StaticRouter location={req.url} context={initialState}>
                    <Routes />
                </StaticRouter>
            );
            res.send(template(html, initialState));
        })
})

export default renderedPageRouter;
