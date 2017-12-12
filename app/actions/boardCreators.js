import { createAction } from 'redux-actions';
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

const setGenerations = createAction(SET_GENERATIONS);
const createGrid = createAction(CREATE_GRID);
const selectBox = createAction(SELECT_BOX);
const seed = createAction(SEED);
const playGame = createAction(PLAY_GAME);
const setIntervalId = createAction(SET_INTERVAL_ID);
const clearGrid = createAction(CLEAR_GRID);
const slow = createAction(SLOW);
const fast = createAction(FAST);
const small = createAction(SMALL);
const medium = createAction(MEDIUM);
const large = createAction(LARGE);

export {
  setGenerations,
  createGrid,
  selectBox,
  seed,
  playGame,
  setIntervalId,
  clearGrid,
  slow,
  fast,
  small,
  medium,
  large,
};

