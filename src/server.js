/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import serveStatic from 'serve-static';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

const initialState = {
  valution: {
    anchor: 10,
    earning: 0.26,
    growth: 0.20
  }
};
const store = configureStore(initialState);

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.resolve(__dirname, '../build/');

app.use(serveStatic(buildPath));

// Server-side rendering of the React app
app.get('*', (req, res, next) => {
  match({routes: routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
    } else if (redirectLocation) {
    } else if (renderProps) {
      const body = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const state = store.getState();
      const html = `<!doctype html>
        <html>
          <head>
            <title>投资</title>
            <link rel="stylesheet" href="/client.css" />
          </head>
          <body>
            <div id="root">${body}</div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
            <script async src="/client.js"></script>
          </body>
        </html>`;
      res.status(200).send(html);
    }
  });
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
