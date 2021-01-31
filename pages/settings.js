import React, { useContext } from 'react';
import { BACKGROUNDS, AppContext } from 'config';
import { randomId } from 'atomic/utils';
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';
import Window, { WINDOW_STYLES } from 'shared/window';

import styles from 'styles/modules/home.module.scss'
import settingsStyles from 'styles/modules/settings.module.scss'

const Settings = () => {
  const { settings, updateSettings } = useContext(AppContext);

  function getBackground(src) {
    return BACKGROUNDS.find(item => item.src === src);
  }

  function onBgChange({ target: imageSelect }) {
    updateSettings({ background: getBackground(imageSelect.value) });
  }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
      <Window containerStyle={WINDOW_STYLES.system} title="Settings">
        <form className={settingsStyles.form} action="">
          <div>
            <label htmlFor="bgImage">
              Background Image:
            </label>
            <select
              name="bgImage"
              id="bgImage"
              onChange={onBgChange}
              value={settings.background.src}>
              {BACKGROUNDS.map(background => (
                <option
                  value={background.src}
                  key={randomId()}>
                  {background.src}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Window>
    </div>
  );
};

export default Settings;
