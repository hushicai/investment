/**
 * @file App Layout
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';

import Breadcrumb from '../../components/Breadcrumb';

function App(props) {
  const {
    title,
    main,
    location
  } = props;

  return (
    <div className="app">
      <header>
        <hgroup>
          <h1>价值回归测算表</h1>
          <h2>
            <Breadcrumb pathname={location.pathname}></Breadcrumb>
          </h2>
        </hgroup>
      </header>
      <main>
        {main}
      </main>
      <footer>
        <p>&copy;2017</p>
      </footer>
    </div>
  );
}

export default App;
