import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';


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

      <Button
        type="button"
        onClick={actions.fast}
      >Fast</Button>

      <Button
        type="button"
        onClick={actions.slow}
      >Slow</Button>

      <Button
        type="button"
        onClick={actions.small}
      >Small 10 X 20</Button>


      <Button
        type="button"
        onClick={actions.medium}
      >Medium 20 X 40</Button>

      <Button
        type="button"
        onClick={actions.large}
      >Large 40 X 600</Button>

    </section>
  );
}

Controls.propTypes = {
  className: PropTypes.string,
  actions: PropTypes.object,
  board: ImmutablePropTypes.map,
};

export default Controls;
