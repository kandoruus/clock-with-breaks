export type clockStateType = {
  sessionInterval: number;
  breakInterval: number;
  clockDisplay: displayTimeType;
  isClockRunning: boolean;
  isSession: boolean;
};

export type displayTimeType = {
  minutes: number;
  seconds: number;
};

export type actionType = {
  type: string;
  payload: string;
};

export type DispatchType = (args: actionType) => actionType;
