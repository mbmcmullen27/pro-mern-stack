import React from 'react';
import { renderToString } from 'react-dom/server';
import Router from 'express';

import Glub from '../src/Glub.jsx'
import template from './template';

const renderedPageRouter = new Router();

renderedPageRouter.get('*', (req, res) => {
    const initialState = { addressee: 'phone lines' };
    const html = renderToString(<Glub {...initialState}/>); // eslint-disable-line
    res.send(template(html));
})
