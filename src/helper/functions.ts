import {
  BREAK,
  MAX_CLOCK_LENGTH,
  MIN_CLOCK_LENGTH,
  SESSION,
} from 'helper/constants';
import { clockStateType } from 'app/types';

export const capitializeFirtLetter = (word: string): string => {
  return word
    .slice(0, 1)
    .toUpperCase()
    .concat(word.slice(1).toLocaleLowerCase());
};

export const incrementState = (state: clockStateType, target: string) => {
  switch (target) {
    case BREAK:
      return {
        ...state,
        breakInterval: Math.min(state.breakInterval + 1, MAX_CLOCK_LENGTH),
      };
    case SESSION:
      return {
        ...state,
        clockDisplay: {
          ...state.clockDisplay,
          minutes: Math.min(state.sessionInterval + 1, MAX_CLOCK_LENGTH),
        },
        sessionInterval: Math.min(state.sessionInterval + 1, MAX_CLOCK_LENGTH),
      };
    default:
      return state;
  }
};

export const decrementState = (state: clockStateType, target: string) => {
  switch (target) {
    case BREAK:
      return {
        ...state,
        breakInterval: Math.max(state.breakInterval - 1, MIN_CLOCK_LENGTH),
      };
    case SESSION:
      return {
        ...state,
        clockDisplay: {
          ...state.clockDisplay,
          minutes: Math.max(state.sessionInterval - 1, MIN_CLOCK_LENGTH),
        },
        sessionInterval: Math.max(state.sessionInterval - 1, MIN_CLOCK_LENGTH),
      };
    default:
      return state;
  }
};

export const tickClock = (state: clockStateType) => {
  if (state.clockDisplay.seconds > 0) {
    return {
      ...state,
      clockDisplay: {
        ...state.clockDisplay,
        seconds: state.clockDisplay.seconds - 1,
      },
    };
  } else if (state.clockDisplay.minutes > 0) {
    return {
      ...state,
      clockDisplay: {
        minutes: state.clockDisplay.minutes - 1,
        seconds: 59,
      },
    };
  } else {
    console.error('ERROR: Attempted to tick zeroed clock');
    console.log(state);
    return state;
  }
};
