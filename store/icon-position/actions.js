export const CHANGE_POSITION = 'icon-position/CHANGE_POSITION';

// Actions
function changePosition(icon) {
  return {
    type: CHANGE_POSITION,
    payload: icon,
  };
}

export {
  changePosition,
};
