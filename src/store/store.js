import { configureStore } from '@reduxjs/toolkit';

import filters from '../slices/filters';
import heroes from '../slices/heroes';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  davTools: process.env.NODE_ENV !== 'production',
});