import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import Grid from '../Grid/';
import Controls from '../Controls/';

import style from './style.scss';

function Main(props) {
  const {
    actions,
    board,
  } = props;

  const wrapperClass = classnames({
    [style.wrapper]: true,
  });

  return (
    <div className={wrapperClass}>
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
