import React from 'react';
import { BACKGROUNDS } from 'config/backgrounds';

const [firstBg] = BACKGROUNDS;

export const initialContext = {
  settings: {
    background: firstBg,
    gravatar: 'https://gravatar.com/avatar/0d6431f3ce241c8c688dfd7831b511c8?s=250',
  }
};

export const AppContext = React.createContext(initialContext);

export { BACKGROUNDS };
