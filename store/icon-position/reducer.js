import { CHANGE_POSITION } from './actions';

/**
 * i.e. {
 *   readme: { x: 0, y: 0 }
 * }
 *
 * @type {{}}
 */
const INITIAL_STATE = {};

const iconPosition = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default iconPosition;
