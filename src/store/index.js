"use client";

import { configureStore } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import persistMiddleware, { getPersistedState } from "./persist";
import rootReducer from "./reducers";
import { setSettings } from "./settings/actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

function StoreWrapper({ children }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const { settings } = getPersistedState();
    dispatch(setSettings(settings));
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) {
    return null;
  }

  return children;
}

function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreWrapper>{children}</StoreWrapper>
    </Provider>
  );
}

CustomProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default CustomProvider;
