/**
 * @file Html
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';

// 开发模式不使用同构
// 方便使用css hot reload
// https://medium.com/@justinjung04/react-server-side-rendering-and-hot-reloading-ffb87ca81a89#.vyztuioiy

class Html extends Component {
  render() {
    const {children, state} = this.props;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>投资</title>
          <meta name="description" content="投资，价值回归测算表，理财计算工具" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {
            (() => {
              if (process.env.NODE_ENV === 'production') {
                <link rel="stylesheet" href="/client.css" />
              }
            })()
          }
        </head>
        <body>
          <div id="root">
            {
              (() => {
                if (process.env.NODE_ENV === 'production') {
                  {children}
                }
              })()
            }
          </div>

          {state && (
            <script
              dangerouslySetInnerHTML={
                {__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`}
              }
            />
          )}

          <script async src="/client.js"></script>
        </body>
      </html>
    );
  }
}

export default Html;
