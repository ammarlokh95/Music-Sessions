import { combineReducers } from 'redux';

import spotifyReducer from './SpotifyReducer';

export default combineReducers({
  Player: spotifyReducer,
});
