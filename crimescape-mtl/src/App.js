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
      <SelectionBar />
      <div className="main-content">
        <ControlPanel />
        <div className="map-insights-container">
          <Map />
          <Insights />
        </div>
      </div>
    </div>
  );
}

export default App;