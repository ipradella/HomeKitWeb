import React from 'react';
import './History.css';
import { LineChart, Line, Legend, CartesianGrid,  XAxis, YAxis } from 'recharts';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css"

registerLocale('fr', fr);

class History extends React.Component {

state = {
  startDate:  new Date(),
  data: this.generateDataTemperature(),
}



generateDataTemperature(){
  const totalHours = 24;
  const totalMinuts = totalHours*60;
  const data = [];

  for(var min = 0; min < totalMinuts; min++){ 
    // Add tag every 180 min 
    if(Number.isInteger(min/180))
      data.push({name: min/60 + ':00', Int: this.randomNumber(16,23), Ext: this.randomNumber(5,10)});
    // Push Value every 30 min
    else if(Number.isInteger(min/60))
      data.push({Int: this.randomNumber(16,23), Ext: this.randomNumber(5,10)});
  };

  return data;
} 

randomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

handleChange = data => {
  console.log(data);
  this.setState({startDate: data},);
}
render() {

  return (
    <div className="History">
      <header className="History-header">

        <DatePicker className="History-header-date"
            selected={this.state.startDate}
            onChange={this.handleChange} 
            dateFormat="d MMMM yyyy"
            locale="fr"/>
                  <nav>
          <ul class="menu">
            <li><a className="navlink" href="#!">Day</a></li>
            <li><a className="navlink" href="#!">Month</a></li>
            <li><a className="navlink" href="#!">Year</a></li>
            <li><a className="navlink" href="#!">Years</a></li>
          </ul>
        </nav>
      </header>
      <body className="History-body">

        <LineChart className="History-chart" width={1000} height={500} data={this.state.data}>
          <Line type="monotone" dataKey="Int" stroke="#d94f5c" />
          <Line type="monotone" dataKey="Ext" stroke="lightblue" />
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="black" />
          <XAxis dataKey="name" label={{ value: 'Hours', position: 'bottom' }} stroke="black" opacity={100} />
          <YAxis label={{ value: '°C', angle: -90, position: 'left' }} stroke="black" opacity={100}/>
          <Legend verticalAlign="top" height={36}/>
        </LineChart>
      </body>
    </div>
  );
}
}

export default History;
