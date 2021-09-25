import React, { useContext } from 'react';
import { BACKGROUNDS, AppContext } from 'config';
import { randomId } from 'atomic/utils';
import Desktop from 'shared/desktop';
import Window from 'shared/window';

import settingsStyles from 'styles/modules/settings.module.scss';

function Settings() {
  const { settings, updateSettings } = useContext(AppContext);

  function getBackground(src) {
    return BACKGROUNDS.find((item) => item.src === src);
  }

  function onBgChange({ target: imageSelect }) {
    updateSettings({ background: getBackground(imageSelect.value) });
  }

  return (
    <React.Fragment>
      <Desktop current="settings" />
      <Window type="system" title="Settings">
        <form className={settingsStyles.form} action="">
          <label htmlFor="bgImage">
            Background Image:
            <select
              name="bgImage"
              id="bgImage"
              onChange={onBgChange}
              value={settings.background.src}
            >
              {BACKGROUNDS.map((background) => (
                <option
                  value={background.src}
                  key={randomId()}
                >
                  {background.src}
                </option>
              ))}
            </select>
          </label>
        </form>
      </Window>
    </React.Fragment>
  );
}

export default Settings;
