import React from 'react';
import './Home.css';
import Temperature from '../Api/Temperature';
import Weather from '../Api/Weather';

class Home extends React.Component {

  state = {
    insideTemp: 'N/A',
    desiredTemp: 'N/A',
    value: 0,
  }

  componentDidMount() {
    this.setState({ 
      insideTemp: Temperature.getInsideTemperature(),
      desiredTemp: Temperature.getDesiredTemperature(),
      weather: Weather.getLocalWeather()
     });
  }

render() {
  var {insideTemp} = this.state;

  return (
    <div class="Home">
      <div class="single-chart">
        <svg viewBox="0 0 36 36" class="circular-chart orange" xmlns="http://www.w3.org/2000/svg">
          <path class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path class="circle"
            stroke-dasharray="80, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="inside-text">{insideTemp}°C</text> 
        </svg>
        <img src="../img/temp-in.png" /> 
      </div>
    </div>
  );
}
}

export default Home;
