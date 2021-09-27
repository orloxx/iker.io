import { BACKGROUNDS } from 'store/settings/backgrounds';
import { PLAYLISTS } from 'store/settings/playlists';

export function getIconPosition(name) {
  return ({ settings }) => settings.iconPosition[name];
}

export function getCurrentBg() {
  function getBackground(src) {
    return BACKGROUNDS.find((bg) => bg.src === src) || BACKGROUNDS[0];
  }

  return ({ settings }) => getBackground(settings.bgSrc);
}

export function getCurrentPlaylist() {
  function getPlaylist(src) {
    return PLAYLISTS.find((bg) => bg.src === src) || PLAYLISTS[0];
  }

  return ({ settings }) => getPlaylist(settings.playlist);
}
