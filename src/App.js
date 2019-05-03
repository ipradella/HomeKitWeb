import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, CartesianGrid,  XAxis, YAxis } from 'recharts';

function generateDataTemperature(){
  const totalHours = 24;
  const totalMinuts = totalHours*60;
  const data = [];

  for(var min = 0; min < totalMinuts; min++){ 
    if(Number.isInteger(min/180))
      data.push({name: min/60, t: Math.random()*23});
    else if(Number.isInteger(min/60))
      data.push({t: Math.random()*23});
  };

  return data;
} 

const data = generateDataTemperature();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <LineChart className="App-chart" width={1000} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="t" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="4 0" />
          <XAxis dataKey="name" label={{ value: 'Hours', position: 'insideBottom' }} />
          <YAxis label={{ value: '°t', angle: -90, position: 'insideLeft' }} />
        </LineChart>
      </body>
    </div>
  );
}

export default App;
