import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './slice';
import {
  persistStore,
  persistReducer,
  REGISTER,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
