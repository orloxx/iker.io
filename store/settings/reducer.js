import { ICON_POSITION } from './actions';

export const INITIAL_STATE = {
  iconPosition: {},
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
    default:
      return state;
  }
};

export default settings;
