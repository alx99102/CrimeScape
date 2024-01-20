import React from 'react';
import Header from './components/Header';
import SelectionBar from './components/SelectionBar';
import ControlPanel from './components/ControlPanel';
import Map from './components/Map';
import Insights from './components/Insights';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
      <div className='control-container'>
        <SelectionBar />
        <ControlPanel />
      </div>
        <div className="map-insights-container">
          <Insights />
        </div>
          <div className='map-container'>
            <Map />
          </div>
      </div>
    </div>
  );
}

export default App;