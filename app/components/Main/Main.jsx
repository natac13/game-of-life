import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';

import Header from '../Header/';
import Grid from '../Grid/';
import Controls from '../Controls/';

import style from './style.scss';

function Main(props) {
  const {
    appName,
    actions,
    board,
  } = props;

  const wrapperClass = classnames({
    [style.wrapper]: true,
  });

  return (
    <div className={wrapperClass}>
      {/*<Header title={appName} />*/}
      <Controls
        actions={actions}
        board={board}
      />
      <Grid
        board={board}
        actions={actions}
      />
      <h2>Generation: {board.get('generations')}</h2>

    </div>
  );
}


Main.propTypes = {
  appName: PropTypes.string,
  actions: PropTypes.object,
  board: ImmutablePropTypes.map,
};

export default Main;
