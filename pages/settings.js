import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BACKGROUNDS } from 'store/settings/backgrounds';
import { changeBackground } from 'store/settings/actions';
import { getCurrentBg } from 'store/settings/selectors';
import { randomId } from 'atomic/utils';
import Desktop from 'shared/desktop';
import Window from 'shared/window';

import settingsStyles from 'styles/modules/settings.module.scss';

function Settings() {
  const currentBg = useSelector(getCurrentBg());
  const dispatch = useDispatch();

  function onBgChange({ target: imageSelect }) {
    dispatch(changeBackground(imageSelect.value));
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
              value={currentBg.src}
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
