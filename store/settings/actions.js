export const ICON_POSITION = 'settings/ICON_POSITION';
export const CHANGE_BG = 'settings/CHANGE_BG';
export const CHANGE_PLAYLIST = 'settings/CHANGE_PLAYLIST';

// Actions
const changeIconPosition = (icon) => ({
  type: ICON_POSITION,
  payload: icon,
});

const changeBackground = (src) => ({
  type: CHANGE_BG,
  payload: src,
});

const changePlaylist = (src) => ({
  type: CHANGE_PLAYLIST,
  payload: src,
});

export {
  changeIconPosition,
  changeBackground,
  changePlaylist,
};
