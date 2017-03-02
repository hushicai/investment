/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serveStatic from 'serve-static';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import routes from './routes';
import Html from './components/Html';
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

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const [config] = require('../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(serveStatic(buildPath));
}

// Server-side rendering of the React app
app.get('*', (req, res, next) => {
  match({routes: routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
    } else if (redirectLocation) {
    } else if (renderProps) {
      const body = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const state = store.getState();
      const html = ReactDOMServer.renderToStaticMarkup(<Html children={body} state={state} />);

      res.status(200).send(html);
    }
  });
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
