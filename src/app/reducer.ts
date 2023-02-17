import {
  RESET,
  START_STOP,
  START_SESSION,
  END_SESSION,
  TICK,
} from 'helper/constants';
import { decrementState, incrementState, tickClock } from 'helper/functions';
import { DECREMENT, INCREMENT } from 'helper/constants';
import { clockStateType, actionType } from 'app/types';

const initState: clockStateType = {
  sessionInterval: 25,
  breakInterval: 5,
  clockDisplay: {
    minutes: 25,
    seconds: 0,
  },
  isClockRunning: false,
  isSession: true,
};

export const reducer = (
  state: clockStateType = initState,
  action: actionType
): clockStateType => {
  switch (action.type) {
    case INCREMENT:
      return incrementState(state, action.payload);
    case DECREMENT:
      return decrementState(state, action.payload);
    case START_STOP:
      return {
        ...state,
        isClockRunning: !state.isClockRunning,
      };
    case RESET:
      return initState;
    case START_SESSION:
      console.log('reduce START_SESSION');
      return {
        ...state,
        clockDisplay: {
          minutes: state.sessionInterval,
          seconds: 0,
        },
        isSession: true,
      };
    case END_SESSION:
      console.log('reduce END_SESSION');
      return {
        ...state,
        clockDisplay: {
          minutes: state.breakInterval,
          seconds: 0,
        },
        isSession: false,
      };
    case TICK:
      return tickClock(state);
    default:
      return state;
  }
};
