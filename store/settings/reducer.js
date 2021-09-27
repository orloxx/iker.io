import { BACKGROUNDS } from 'store/settings/backgrounds';

import { ICON_POSITION, CHANGE_BG, CHANGE_PLAYLIST } from 'store/settings/actions';

export const INITIAL_STATE = {
  iconPosition: {},
  bgSrc: BACKGROUNDS[0].src,
  playlist: 'https://api.soundcloud.com/playlists/1177045477',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ICON_POSITION:
      return {
        ...state,
        iconPosition: {
          ...state.iconPosition,
          ...action.payload,
        },
      };
    case CHANGE_BG:
      return {
        ...state,
        bgSrc: action.payload,
      };
    case CHANGE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload ? action.payload : INITIAL_STATE.playlist,
      };
    default:
      return state;
  }
};

export default settings;