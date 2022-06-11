import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUNDS } from 'store/settings/backgrounds'
import { PLAYLISTS } from 'store/settings/playlists'
import { changeBackground, changePlaylist } from 'store/settings/actions'
import { getCurrentBg, getCurrentPlaylist } from 'store/settings/selectors'
import Desktop from 'shared/desktop'
import Window from 'shared/window'

import settingsStyles from 'styles/modules/settings.module.scss'

function Settings() {
  const currentBg = useSelector(getCurrentBg())
  const currentPlaylist = useSelector(getCurrentPlaylist())
  const dispatch = useDispatch()

  function onBgChange({ target: imageSelect }) {
    dispatch(changeBackground(imageSelect.value))
  }

  return (
    <>
      <Desktop current="settings" />
      <Window type="system" title="Settings">
        <form className={settingsStyles.form} action="">
          <label htmlFor="bgImage">
            Background Image:
            <select name="bgImage" id="bgImage" onChange={onBgChange} value={currentBg.src}>
              {BACKGROUNDS.map((background) => (
                <option value={background.src} key={background.src}>
                  {background.src}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="playlistUrl">
            Soundcloud link:
            <select
              name="playlistSelect"
              id="playlistSelect"
              onChange={({ target }) => dispatch(changePlaylist(target.value))}
              value={currentPlaylist.src}
            >
              {PLAYLISTS.map((playlist) => (
                <option value={playlist.src} key={playlist.src}>
                  {playlist.label}
                </option>
              ))}
            </select>
          </label>
        </form>
      </Window>
    </>
  )
}

export default Settings
