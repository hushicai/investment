/**
 * @file 首页
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import {Link} from 'react-router';

function Home(props) {
  const {children}  = props;

  return (
    <div className="home">
      <h3>Hello World!</h3>
    </div>
  );
}

export default Home;
