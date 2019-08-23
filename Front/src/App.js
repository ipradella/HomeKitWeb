import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, Legend, CartesianGrid,  XAxis, YAxis } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

class App extends React.Component {

state = {
  startDate:  new Date(),
  data: this.generateDataTemperature(),
}

generateDataTemperature(){
  const totalHours = 24;
  const totalMinuts = totalHours*60;
  const data = [];

  for(var min = 0; min < totalMinuts; min++){ 
    if(Number.isInteger(min/180))
      data.push({name: min/60 + ':00', Int: this.randomNumber(16,23), Ext: this.randomNumber(5,10)});
    else if(Number.isInteger(min/60))
      data.push({Int: this.randomNumber(16,23), Ext: this.randomNumber(5,10)});
  };

  return data;
} 

randomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

render() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary button-background">Day</button>
          <button type="button" class="btn btn-secondary button-background">Month</button>
          <button type="button" class="btn btn-secondary button-background">Year</button>
          <button type="button" class="btn btn-secondary button-background">Years</button>
        </div>
        <DatePicker className="App-header-date"
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </header>
      <body className="App-body">

        <LineChart className="App-chart" width={1000} height={500} data={this.state.data}>
          <Line type="monotone" dataKey="Int" stroke="yellow" />
          <Line type="monotone" dataKey="Ext" stroke="lightblue" />
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="lightgrey" />
          <XAxis dataKey="name" label={{ value: 'Hours', position: 'bottom' }} stroke="#ffffff" opacity={100} />
          <YAxis label={{ value: '°C', angle: -90, position: 'left' }} stroke="#ffffff" opacity={100}/>
          <Legend verticalAlign="top" height={36}/>
        </LineChart>
      </body>
    </div>
  );
}
}

export default App;
