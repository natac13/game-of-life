import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions';
import { pure, compose } from 'recompose';

import NavBar from '../../components/NavBar/';
import Display from '../../components/Display/';

class App extends Component {
  componentWillMount() {
    console.log('Mounted')
  }
  render() {
    const { actions, error } = this.props;

    const childrenWithStoreProp = React.Children.map(
      this.props.children,
      (child) => React.cloneElement(child, { ...this.props })
    );
    return (
      <div>
        <NavBar actions={actions} />
        <Display error={error} actions={actions} />
        {childrenWithStoreProp}
      </div>
    );
  }
}

App.propTypes = {
  form: ImmutablePropTypes.map.isRequired,
  routing: ImmutablePropTypes.map.isRequired,
  error: ImmutablePropTypes.map,
  actions: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

//  Redux Connection
function mapStateToProps(state) {
  return {
    appName: 'ActionPlan',
    routing: state.get('routing'),
    error: state.get('error'),
    board: state.get('board'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure,
)(App);
