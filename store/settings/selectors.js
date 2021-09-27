import { BACKGROUNDS } from 'store/settings/backgrounds';

export function getIconPosition(name) {
  return ({ settings }) => settings.iconPosition[name];
}

export function getCurrentBg() {
  function getBackground(src) {
    return BACKGROUNDS.find((bg) => bg.src === src);
  }

  return ({ settings }) => getBackground(settings.bgSrc);
}

export function getPlaylist() {
  return ({ settings }) => settings.playlist;
}
