import { DISPLAY_USERS_SONGS, DISPLAY_USERS_ALBUMS, FETCH_ERROR } from './types';

const baseURL = 'https://api.spotify.com/v1';

export const getUsersSongs = () => (dispatch) => {
  const URL = `${baseURL}/me/tracks`;
  const { token } = window;
  console.log(`fetching songs : ${token}`);
  if (token) {
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then((tracks) => {
        dispatch({
          type: DISPLAY_USERS_SONGS,
          payload: tracks,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_ERROR,
          payload: err,
        });
      });
  }
};

export const getUsersAlbums = () => (dispatch) => {
  const URL = `${baseURL}/me/albums`;
  const { token } = window;
  if (token) {
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then((albums) => {
        dispatch({
          type: DISPLAY_USERS_ALBUMS,
          payload: albums,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_ERROR,
          payload: err,
        });
      });
  }
};
