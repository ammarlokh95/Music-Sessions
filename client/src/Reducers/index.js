import { combineReducers } from 'redux';

import songsReducer from './SongsReducer';

export default combineReducers({
  items: songsReducer,
});
