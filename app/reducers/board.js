import { Map, List, fromJS } from 'immutable';
import random from 'lodash/random';
import {
  SET_GENERATIONS,
  CREATE_GRID,
  SELECT_BOX,
  SEED,
  PLAY_GAME,
  SET_INTERVAL_ID,
  CLEAR_GRID,
  SLOW,
  FAST,
  SMALL,
  MEDIUM,
  LARGE,
} from '../constants/';


const initialState = Map({
  generations: 0,
  speed: 100,
  rows: 30,
  cols: 50,
  fullGrid: List(),
  intervalId: undefined,
});

function clearGrid(state) {
  const rows = state.get('rows');
  const cols = state.get('cols');
  const fresh = List(Array(rows).fill()).map(
      () => List(Array(cols).fill(false))
    );
  return state
    .set('fullGrid', fresh)
    .set('generations', 0);
}

function selectBox(state, { row, col }) {
  const path = ['fullGrid', row, col];
  const prevCondition = state.getIn(path);
  return state.setIn(path, !prevCondition);
}

function seed(state) {
  const fullGrid = state.get('fullGrid');
  const seededGrid = fullGrid.map((row) => (
    row.map(() => random(0, 3) === 1)
  ));

  return state.set('fullGrid', seededGrid);
}

function playGame(state) {
  const fullGrid = state.get('fullGrid');
  const copiedGrid = fromJS(fullGrid);
  const lastRowIndex = state.get('rows') - 1;
  const lastColIndex = state.get('cols') - 1;

  const newGrid = copiedGrid.map((row, ir) => {
    return row.map((cell, ic) => {
      /**
       * A Cell in the middle of the grid can have a possible of 8 neighbors
       * This leads me to have to check each of those cells and see if the
       * neighbor is true or false(alive or dead).
       * Thinking of a cell with the full 8 neighbors I will used N, S, E, W
       * direction to determine which if statement handles what neighbor
       */
      let neighbours = 0;
      /* Game of Life Rules*/

      /* N */
      if (ir > 0) {  // if not the first row, same column
        if (fullGrid.getIn([ir - 1, ic])) {
          neighbours++;
        }
      }

      /* NW */
      if (ir > 0 && ic > 0) {  // not the first row or column
        if (fullGrid.getIn([ir - 1, ic - 1])) {
          neighbours++;
        }
      }

      /* NE */
      if (ir > 0 && ic < lastColIndex) {  // not first row or last column
        if (fullGrid.getIn([ir - 1, ic + 1])) {
          neighbours++;
        }
      }

      /* E */
      if (ic < lastColIndex) {  // not the last column, use same row
        if (fullGrid.getIn([ir, ic + 1])) {
          neighbours++;
        }
      }

      /* W */
      if (ic > 0) {  // not the first column, use same row
        if (fullGrid.getIn([ir, ic - 1])) {
          neighbours++;
        }
      }

      /* S */
      if (ir < lastRowIndex) {  // not the last row, use same column
        if (fullGrid.getIn([ir + 1, ic])) {
          neighbours++;
        }
      }

      /* SW */
      if (ir < lastRowIndex && ic > 0) {  // not last row or first column
        if (fullGrid.getIn([ir + 1, ic - 1])) {
          neighbours++;
        }
      }

      /* SE */
      if (ir < lastRowIndex && ic < lastColIndex) {  // not last row or column
        if (fullGrid.getIn([ir + 1, ic + 1])) {
          neighbours++;
        }
      }


      /* Return statements */

      /* Was Alive */
      if (cell && (neighbours < 2 || neighbours > 3)) {
        return false;
      }

      /* Not alive */
      if (!cell && neighbours === 3) {
        return true;
      }
      return cell;
    });
  });

  const nextGen = state.get('generations') + 1;
  return state
    .set('fullGrid', newGrid)
    .set('generations', nextGen);
}

function board(state = initialState, action) {
  switch (action.type) {
    case SET_GENERATIONS:
      return state.set('generations', action.payload);
    case CREATE_GRID:
      return state.set('fullGrid', action.payload).set('generations', 0);
    case SELECT_BOX:
      return selectBox(state, action.payload);
    case SEED:
      return seed(state);
    case PLAY_GAME:
      return playGame(state);
    case SET_INTERVAL_ID:
      return state.set('intervalId', action.payload);
    case CLEAR_GRID:
      return clearGrid(state);
    case SLOW:
      return state.set('speed', 1000);
    case FAST:
      return state.set('speed', 100);
    case SMALL:
      return state.set('rows', 10).set('cols', 20);
    case MEDIUM:
      return state.set('rows', 20).set('cols', 40);
    case LARGE:
      return state.set('rows', 40).set('cols', 60);
    default:
      return state;
  }
}

export default board;
