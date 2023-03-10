import {
  endSessionAction,
  resetAction,
  startSessionAction,
  startStopAction,
  tickAction,
} from 'app/action-creators';
import { clockStateType, DispatchType, displayTimeType } from 'app/types';
import { BEEP_URL } from 'helper/constants';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const TimerDisplay = () => {
  const state = useSelector((state: clockStateType) => state);
  const clockSound: React.MutableRefObject<HTMLAudioElement | null> =
    useRef(null);
  const dispatch: DispatchType = useDispatch();

  const playBeep = () => {
    if (clockSound.current) {
      clockSound.current.play();
    }
  };

  const stopBeep = () => {
    if (clockSound.current) {
      clockSound.current.pause();
      clockSound.current.currentTime = 0;
    }
  };

  const toTimeString = (time: number): string => {
    return time < 10 ? '0' + time : time.toString();
  };

  const displayToString = (time: displayTimeType): string => {
    return toTimeString(time.minutes) + ':' + toTimeString(time.seconds);
  };

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    stopBeep();
    dispatch(resetAction());
  };

  const handleStartStop = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(startStopAction());
  };

  const tickTimer = () => {
    if (state.clockDisplay.seconds > 0 || state.clockDisplay.minutes > 0) {
      dispatch(tickAction());
    } else if (state.isSession) {
      playBeep();
      dispatch(endSessionAction());
    } else {
      playBeep();
      dispatch(startSessionAction());
    }
  };

  useEffect(() => {
    let ticking: NodeJS.Timeout | undefined;
    if (state.isClockRunning) {
      ticking = setInterval(() => tickTimer(), 1000);
    } else {
      clearInterval(ticking);
    }

    return () => clearInterval(ticking);
  }, [state.isClockRunning, state.clockDisplay]);

  return (
    <div id="display-wrapper">
      <div id="timer-label">{state.isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{displayToString(state.clockDisplay)}</div>
      <div className="control-panel" id="display-cp">
        <div id="start_stop" onClick={handleStartStop}>
          <i className="fa fa-play"></i>
          <i className="fa fa-pause"></i>
        </div>
        <div id="reset" onClick={handleReset}>
          <i className="fa fa-refresh"></i>
        </div>
      </div>
      <audio id="beep" preload="auto" src={BEEP_URL} ref={clockSound}></audio>
    </div>
  );
};
