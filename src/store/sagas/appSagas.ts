import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AnimalList } from './interface';
import { Response } from 'node-fetch';
import {
  getAnimalListStart,
  getAnimalListSuccess,
  getAnimalListError,
} from '../appReducer';

function createRequestGetAnimalList(isServer = false) {
  return function* (action: ReturnType<typeof getAnimalListStart>) {
    const per_page = action.payload;
    try {
      const response: Response = yield call(
        fetch,
        `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${per_page}`,
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('not found');
        } else {
          throw new Error('An error occurred while fetching the list');
        }
      }

      const data: AnimalList = yield response.json();
      const action: PayloadAction<AnimalList> = yield put(
        getAnimalListSuccess(data),
      );

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action: PayloadAction<AnimalList> = yield put(
        getAnimalListError(error),
      );

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const requestGetCharacter = createRequestGetAnimalList();
export const requestGetCharacterServer = createRequestGetAnimalList(true);

export function* requestGetCharacterWatcher() {
  yield takeLatest(getAnimalListStart.type, requestGetCharacter);
}

export default [requestGetCharacterWatcher()];
