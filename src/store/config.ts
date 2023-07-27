import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import appReducer from './appReducer';
import appSagas from './sagas/appSagas';
import createSagaMiddleware from 'redux-saga';

interface RootState {
  app: ReturnType<typeof appReducer>;
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  app: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([...appSagas]);
}

sagaMiddleware.run(rootSaga);

export default store;
export type { RootState };
