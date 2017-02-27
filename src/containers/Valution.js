import React, {Component} from 'react';
import {updateValutionParam} from '../actions';
import {connect} from 'react-redux';

import Valution from '../components/Valution';

const mapStateToProps = (state, ownProps) => {
  return {
    earning: state.valution.earning,
    growth: state.valution.growth,
    anchor: state.valution.anchor
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (valution) => {
      dispatch(updateValutionParam(valution));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Valution);
