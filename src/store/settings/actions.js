export const SET_SETTINGS = 'settings/SET_SETTINGS'
export const ICON_POSITION = 'settings/ICON_POSITION'
export const CHANGE_BG = 'settings/CHANGE_BG'
export const CHANGE_PLAYLIST = 'settings/CHANGE_PLAYLIST'

// Actions
export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings,
})

export const changeIconPosition = (icon) => ({
  type: ICON_POSITION,
  payload: icon,
})

export const changeBackground = (src) => ({
  type: CHANGE_BG,
  payload: src,
})

export const changePlaylist = (src) => ({
  type: CHANGE_PLAYLIST,
  payload: src,
})
