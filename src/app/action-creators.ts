import { actionType } from 'app/types';
import {
  DECREMENT,
  INCREMENT,
  START_STOP,
  RESET,
  START_SESSION,
  END_SESSION,
  TICK,
} from 'helper/constants';

export const incrementAction = (target: string): actionType => {
  return {
    type: INCREMENT,
    payload: target,
  };
};

export const decrementAction = (target: string): actionType => {
  return {
    type: DECREMENT,
    payload: target,
  };
};

export const startStopAction = (): actionType => {
  return {
    type: START_STOP,
    payload: START_STOP,
  };
};

export const resetAction = (): actionType => {
  return {
    type: RESET,
    payload: RESET,
  };
};

export const startSessionAction = (): actionType => {
  return {
    type: START_SESSION,
    payload: START_SESSION,
  };
};

export const endSessionAction = (): actionType => {
  return {
    type: END_SESSION,
    payload: END_SESSION,
  };
};

export const tickAction = (): actionType => {
  return {
    type: TICK,
    payload: TICK,
  };
};
