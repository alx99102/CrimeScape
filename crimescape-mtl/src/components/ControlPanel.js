import React from 'react';

const ControlPanel = () => (
  <div className="control-panel">
    <select name="type">
      {/* Populate with options */}
    </select>
    <input type="date" name="start-date" />
    <input type="date" name="end-date" />
    <select name="time-of-day">
      {/* Populate with options */}
    </select>
  </div>
);

export default ControlPanel;