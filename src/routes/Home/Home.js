/**
 * @file 首页
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import {Link} from 'react-router';

import ValutionContainer from '../../containers/Valution';

function Home(props) {
  const {children}  = props;

  return (
    <div className="home">
      <ValutionContainer />
    </div>
  );
}

export default Home;
