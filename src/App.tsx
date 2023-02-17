import React from 'react';
import 'App.css';
import { IntervalControl } from 'components/IntervalControl';
import { TimerDisplay } from 'components/TimerDisplay';

function App() {
  return (
    <div id="display">
      <h1 id="title">25 + 5 Clock</h1>
      <IntervalControl idKey="break" />
      <IntervalControl idKey="session" />
      <TimerDisplay />
    </div>
  );
}

export default App;
