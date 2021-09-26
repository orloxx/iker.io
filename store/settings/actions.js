export const ICON_POSITION = 'settings/ICON_POSITION';

// Actions
function changeIconPosition(icon) {
  return {
    type: ICON_POSITION,
    payload: icon,
  };
}

export {
  changeIconPosition,
};
