import React from 'react';
import Header from './components/Header';
import SelectionBar from './components/SelectionBar';
import Map from './components/Map';
import Insights from './components/Insights';
import './App.css';
import { useRef, useState } from 'react';
import MapVisual from './components/MapVisual';

function App() {
  
  const [componentKey, setComponentKey] = useState(1)
  let type = useRef('');
  let start_date = useRef('');
  let end_date = useRef('');
  let is_prediction = useRef('');
  let time_of_day = useRef('');
  let currentBody = { is_prediction: false, type: type.current.value, start_date: start_date.current.value, end_date: end_date.current.value, time_of_day: time_of_day.current.value }

  function onChangeEvent(e) {

    console.log(start_date)

    setComponentKey(prevKey => prevKey + 1);

  }


  return (
    <div className="App">
      <Header />
      <SelectionBar />
      <div className="main-content">
        <div className="control-panel">
          <select name="type" onChange={onChangeEvent} ref={type}>
            <option value="car-theft">Car Theft</option>
            <option value="misdemeanor">Misdemeanor</option>
            <option value="car-break-ins">Car Break-Ins</option>
            <option value="breaking-and-entering">Breaking and Entering</option>
            <option value="armed-robbery">Armed Robbery</option>
          </select>
          <input type="date" name="start-date" onChange={onChangeEvent} ref={start_date} min="2015-01-01" max="2024-01-17"/>
          <input type="date" name="end-date" onChange={onChangeEvent} ref={end_date} min="2015-01-01" max="2024-01-17"/>
          <select name="time-of-day" onChange={onChangeEvent} ref={time_of_day}>
            <option value="day">Day</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>
        <div className="map-insights-container">
          <Map key={componentKey} body={currentBody} />
          <Insights />
        </div>
      </div>
    </div>
  );
}

export default App;