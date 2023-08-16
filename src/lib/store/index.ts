import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import loading from './slices/loading.slice';
import podcasts from './slices/podcast.slice';

import podcastSaga from './sagas/podcast.saga';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({ loading, podcasts });

const persistedReducer = persistReducer(persistConfig, reducers) as Reducer<ReturnType<typeof reducers>>;

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(podcastSaga)]);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: !import.meta.env.PROD,
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
