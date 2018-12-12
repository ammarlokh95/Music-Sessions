import { DISPLAY_USERS_SONGS } from '../Actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_USERS_SONGS: {
      console.log('got user songs');
      const { items } = action.payload;
      return {
        ...state,
        items,
      };
    }
    default:
      return state;
  }
}
