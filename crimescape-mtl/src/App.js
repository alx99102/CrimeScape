import React, { useRef, useState } from 'react';
import Header from './components/Header';
import SelectionBar from './components/SelectionBar';
import Map from './components/Map';
import Insights from './components/Insights';
import './App.css'; // Ensure this file includes the CSS for Header and SelectionBar, if necessary
import Toggle from 'react-toggle';
function App() {

  const [forecast, setForecast] = useState(false);
  const [componentKey, setComponentKey] = useState(1);
  let type = useRef('');
  let start_date = useRef('');
  let end_date = useRef('');
  //let is_prediction = useRef('');
  let time_of_day = useRef('');
  let currentBody = {
    is_prediction: forecast,
    type: type.current.value,
    start_date: start_date.current.value,
    end_date: end_date.current.value,
    time_of_day: time_of_day.current.value
  };

  function onChangeEvent(e) {

    setComponentKey(prevKey => prevKey + 1);

  }

  const toggleForecast = () => {
    setForecast(!forecast)
    console.log(forecast);
    setComponentKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App flex flex-col h-screen">
      <Header />
      <div className="main-content flex flex-1">
        <div className="control-panel w-4/5 overflow-y-auto">
          <div className='flex flex-row'>
            <label>
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={toggleForecast} />
              <span>Forecasting</span>
            </label>
            <select name="type" onChange={onChangeEvent} ref={type}>
              <option value="car-theft">Car Theft</option>
              <option value="misdemeanor">Misdemeanor</option>
              <option value="car-break-ins">Car Break-Ins</option>
              <option value="breaking-and-entering">Breaking and Entering</option>
              <option value="armed-robbery">Armed Robbery</option>
            </select>
            {currentBody.is_prediction ? (
                <div><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="start-date" onChange={onChangeEvent} ref={start_date} min="2024-01-18" max="2024-12-31"/>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="end-date" onChange={onChangeEvent} ref={end_date} min="2024-01-18" max="2024-12-31"/></div>) :          
                (<div><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="start-date" onChange={onChangeEvent} ref={start_date} min="2015-01-01" max="2024-01-17"/>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" name="end-date" onChange={onChangeEvent} ref={end_date} min="2015-01-01" max="2024-01-17"/></div>)
            }
  

            <select name="time-of-day" onChange={onChangeEvent} ref={time_of_day}>
              <option value="day">Day</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
          <Map key={componentKey} body={currentBody} />
        </div>
        <div className="map-insights-container w-1/5 overflow-y-auto bg-blue-900">
          <Insights />
        </div>
      </div>
    </div>
  );
}

export default App;
