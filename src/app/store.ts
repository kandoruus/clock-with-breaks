import { configureStore, ThunkAction, Action, Store } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { actionType, clockStateType, DispatchType } from 'app/types';
import { reducer } from 'app/reducer';

export const store: Store<clockStateType, actionType> & {
  dispatch: DispatchType;
} = configureStore({ reducer, middleware: [thunk] });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
