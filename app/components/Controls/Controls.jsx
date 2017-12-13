import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import {
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';


import style from './style.scss';

function Controls(props) {
  const {
    className,
    actions,
    board,
  } = props;

  const wrapperClass = classnames({
    [className]: !!className,
    [style.wrapper]: true,
  });

  return (
    <section className={wrapperClass}>
      <Button
        type="button"
        onClick={() => clearInterval(board.get('intervalId'))}
      >Stop</Button>

      <Button
        type="button"
        onClick={() => actions.setIntervalId(
          setInterval(
            actions.playGame,
            board.get('speed')
          )
        )}
      >Start</Button>

      <Button
        type="button"
        onClick={actions.clearGrid}
      >Clear</Button>

      <Button
        type="button"
        onClick={actions.seed}
      >Seed</Button>

      <DropdownButton
        type="button"
        title="Speed"
      >
        <MenuItem eventKey="slow" onClick={actions.slow}>Slow</MenuItem>
        <MenuItem eventKey="fast" onClick={actions.fast}>Fast</MenuItem>
      </DropdownButton>

      <DropdownButton
        type="button"
        title="Grid Size"
      >
        <MenuItem eventKey="s" onClick={actions.small}>Small 15 X 30</MenuItem>
        <MenuItem eventKey="m" onClick={actions.medium}>Medium 30 X 50</MenuItem>
        <MenuItem eventKey="l" onClick={actions.large}>Large 50 X 75</MenuItem>
      </DropdownButton>
    </section>
  );
}

Controls.propTypes = {
  className: PropTypes.string,
  actions: PropTypes.object,
  board: ImmutablePropTypes.map,
};

export default Controls;
