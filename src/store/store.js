import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './apiSlice';
import { blackListApi} from './blackListApi';
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [blackListApi.reducerPath]: blackListApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [api.reducerPath], 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, blackListApi.middleware),
  devTools: true,
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);