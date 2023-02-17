import { decrementAction, incrementAction } from 'app/action-creators';
import { clockStateType, DispatchType } from 'app/types';
import { BREAK } from 'helper/constants';
import { capitializeFirtLetter } from 'helper/functions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  idKey: string;
};

export const IntervalControl: React.FC<Props> = ({ idKey }) => {
  const labelText = useSelector((state: clockStateType) =>
    idKey === BREAK ? state.breakInterval : state.sessionInterval
  );
  const isClockRunning = useSelector(
    (state: clockStateType) => state.isClockRunning
  );
  const dispatch: DispatchType = useDispatch();

  const handleDecrement = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClockRunning) dispatch(decrementAction(idKey));
  };

  const handleIncrement = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClockRunning) dispatch(incrementAction(idKey));
  };

  return (
    <div className="ic-wrapper">
      <div className="ic-title" id={idKey + '-label'}>
        {capitializeFirtLetter(idKey) + ' Length'}
      </div>
      <div className="control-panel">
        <div
          className="ic-decrement"
          id={idKey + '-decrement'}
          onClick={handleDecrement}
        >
          <i className="fa fa-arrow-down"></i>
        </div>
        <div className="ic-interval" id={idKey + '-length'}>
          {labelText}
        </div>
        <div
          className="ic-increment"
          id={idKey + '-increment'}
          onClick={handleIncrement}
        >
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>
    </div>
  );
};
