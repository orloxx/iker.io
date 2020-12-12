import React, { useContext } from 'react';
import { BGS, AppContext } from 'config';
import CustomHead from 'shared/custom-head';
import Desktop from 'shared/desktop';
import Window from 'shared/window';

import styles from 'styles/modules/home.module.scss'

const Slug = () => {
  const { settings, updateSettings } = useContext(AppContext);

  function onBgChange({ target: imageSelect }) {
    updateSettings({ bgImage: imageSelect.value });
  }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Desktop />
      <Window>
        <form action="">
          <label htmlFor="bgImage">
            Background Image
          </label>
          <select name="bgImage" id="bgImage" onChange={onBgChange}>
            {BGS.map(bgImage => (
              <option
                value={bgImage}
                selected={settings.bgImage === bgImage}>
                {bgImage}
              </option>
            ))}
          </select>
        </form>
      </Window>
    </div>
  );
};

export default Slug;
