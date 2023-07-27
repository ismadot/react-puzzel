import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, baseRequest, AnimalList } from './sagas/interface';

interface AppState {
  requestAnimalList: baseRequest<AnimalList>;
}

const callDefault = {
  loading: false,
  error: null,
  data: null,
};

const initialState: AppState = {
  requestAnimalList: callDefault,
};

export const getAnimalListStart = createAction<number>(
  ActionType.GET_ANIMAL_LIST_START,
);
export const getAnimalListSuccess = createAction<null | AnimalList>(
  ActionType.GET_ANIMAL_LIST_SUCCESS,
);
export const getAnimalListError = createAction<null | any>(
  ActionType.GET_ANIMAL_LIST_ERROR,
);

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAnimalListStart, (state) => {
      state.requestAnimalList = { ...callDefault, loading: true };
    })
    .addCase(getAnimalListError, (state, action: PayloadAction<null | any>) => {
      state.requestAnimalList = { ...callDefault, error: action.payload };
    })
    .addCase(
      getAnimalListSuccess,
      (state, action: PayloadAction<null | AnimalList>) => {
        state.requestAnimalList = { ...callDefault, data: action.payload };
      },
    );
});

export default appReducer;
