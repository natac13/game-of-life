import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import blankGrid from 'Utils/blankGrid.js';

import Box from '../Box/';

import style from './style.scss';

export default class Grid extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.object,
    board: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);
    // console.log(props);

    /** Styling */
    const wrapperClass = classnames({
      [style.grid]: true,
      [props.className]: !!props.className,
    });

    const board = this.props.board;
    const rows = board.get('rows');
    const cols = board.get('cols');
    const speed = board.get('speed');

    /** Function Binding - only need for render */
    const fullGrid = this._createGrid(rows, cols);
    const gridDisplay = this._createGridDisplay(fullGrid);

    /** State Creation */
    this.state = {
      wrapperClass,
      fullGrid,
      rows,
      cols,
      speed,
      gridDisplay,
    };
  }

  componentWillReceiveProps(nextProps) {
    const oldRows = this.state.rows;
    const oldSpeed = this.state.speed;
    const rows = nextProps.board.get('rows');
    const cols = nextProps.board.get('cols');
    const speed = nextProps.board.get('speed');
    /* Board Size changed */
    if (oldRows !== rows) {  // board changed size
      clearInterval(this.props.board.get('intervalId'));
      const newGrid = this._createGrid(rows, cols);
      return this.setState({
        gridDisplay: this._createGridDisplay(newGrid),
        rows,
        cols,
      });
    }
    /* When the speed changes restart the game, with new speed */
    if (oldSpeed !== speed) {
      this._playButton(speed);
      return this.setState({
        speed,
      });
    }

    const fullGrid = nextProps.board.get('fullGrid');
    const newGridDisplay = this._createGridDisplay(fullGrid);
    return this.setState({
      gridDisplay: newGridDisplay,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { rows, speed } = this.state;
    const oldRows = prevState.rows;
    if (rows !== oldRows) {
      // Grid Changed
      this.props.actions.seed();
      this._playButton(speed);
    }
  }

  componentDidMount() {
    this.props.actions.seed();
    this._playButton();
  }

  componentWillUnMount() {
    this.props.actions.stop();
  }

  _createGrid(rows, cols) {
    const fullGrid = blankGrid(rows, cols);
    this.props.actions.createGrid(fullGrid);
    return fullGrid;
  }

  _createGridDisplay(fullGrid) {
    const gridDisplay = fullGrid.map((row, ir) => (
      row.map((cell, ic) => {
        const boxId = `${ir}_${ic}`;
        const boxClass = cell ? 'on' : 'off';
        return (
          <Box
            className={boxClass}
            key={boxId}
            boxId={boxId}
            row={ir}
            col={ic}
            selectBox={this.props.actions.selectBox}
          />
        );
      })
    ));

    return gridDisplay;
  }

  _playButton(speed) {
    return this.props.actions.setIntervalId(
      setInterval(
        this.props.actions.playGame,
        speed
      )
    );
  }

  render() {
    const {
      wrapperClass,
      cols,
      gridDisplay,
    } = this.state;

    const width = cols * 14;

    return (
      <section className={wrapperClass} style={{ width }}>
        {gridDisplay}
      </section>
    );
  }

}
