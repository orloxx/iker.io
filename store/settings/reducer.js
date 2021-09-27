import { BACKGROUNDS } from 'store/settings/backgrounds';

import { ICON_POSITION, CHANGE_BG } from 'store/settings/actions';

export const INITIAL_STATE = {
  iconPosition: {},
  bgSrc: BACKGROUNDS[0].src,
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
    default:
      return state;
  }
};

export default settings;
