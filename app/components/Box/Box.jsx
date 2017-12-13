import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import style from './style.scss';

function Box(props) {
  const {
    className,
    boxId,
    row,
    col,
    selectBox,
  } = props;

  const boxOn = className === 'on';

  const wrapperClass = classnames({
    [style.box]: true,
    [style.on]: boxOn,
    [style.off]: !boxOn,
  });


  return (
    <div
      className={wrapperClass}
      onClick={() => { return selectBox({ row, col }); }}
      id={boxId}
    />
  );
}

Box.propTypes = {
  className: PropTypes.string,
  selectBox: PropTypes.func.isRequired,
  boxId: PropTypes.string.isRequired,
  row: PropTypes.number,
  col: PropTypes.number,
};

export default Box;
