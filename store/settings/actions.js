export const ICON_POSITION = 'settings/ICON_POSITION';
export const CHANGE_BG = 'settings/CHANGE_BG';

// Actions
const changeIconPosition = (icon) => ({
  type: ICON_POSITION,
  payload: icon,
});

const changeBackground = (src) => ({
  type: CHANGE_BG,
  payload: src,
});

export {
  changeIconPosition,
  changeBackground,
};
