import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apiSlice';

/**
 * Redux Store Configuration.
 * 
 * - `reducer`: Combines the API slice reducer into the root state.
 * - `middleware`: Adds the RTK Query middleware for caching, invalidation, and polling.
 */
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

/**
 * setupListeners enables refetchOnFocus and refetchOnReconnect behaviors.
 */
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
