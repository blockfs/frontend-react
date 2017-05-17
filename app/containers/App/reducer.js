/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS,
  LOAD_BLOCKS_ERROR,
  LOAD_FILES_SUCCESS,
  LOAD_FILES,
  LOAD_FILES_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    blocks: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'blocks'], false);
    case LOAD_BLOCKS_SUCCESS:
      return state
        .setIn(['userData', 'blocks'], action.blocks)
        .set('loading', false);
    case LOAD_BLOCKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_FILES:
      return state
        .setIn(['userData', 'files'], false);
    case LOAD_FILES_SUCCESS:
      return state
        .setIn(['userData', 'files'], action.files);
    case LOAD_FILES_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
