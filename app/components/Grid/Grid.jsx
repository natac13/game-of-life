import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';
import Immutable from 'immutable';
import _ from 'lodash';

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
    console.log(props);

    /** Styling */
    const wrapperClass = classnames({
      [style.grid]: true,
      [props.className]: !!props.className,
    });

    /** Function Binding - only need for render */


    const board = this.props.board;
    const rows = board.get('rows');
    const cols = board.get('cols');
    const speed = board.get('speed');

    const fullGrid = this._createGrid(rows, cols);
    console.log(fullGrid)
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

  componentWillReceiveProps(nextProps, actions) {
    const oldRows = this.state.rows;
    const oldSpeed = this.state.speed;
    const rows = nextProps.board.get('rows');
    const cols = nextProps.board.get('cols');
    const speed = nextProps.board.get('speed');
    if (oldRows !== rows) {  // board changed size
      clearInterval(this.props.board.get('intervalId'));
      const newGrid = this._createGrid(rows, cols);
      return this.setState({
        gridDisplay: this._createGridDisplay(newGrid),
        rows,
        cols,
      });
    }

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

  componentDidMount() {
    this.props.actions.seed();
    this._playButton(this.props.board.get('speed'));
  }

  componentWillUnMount() {
    clearInterval(this.props.board.get('intervalId'));
  }

  _createGrid(rows, cols) {
    const fullGrid = Immutable.List(Array(rows).fill()).map(
      () => Immutable.List(Array(cols).fill(false))
    );
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
    clearInterval(this.props.board.get('intervalId'));
    this.props.actions.setIntervalId(
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
