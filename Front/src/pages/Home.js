import React from 'react';
import './Home.css';
import Temperature from '../Api/Temperature';
import Weather from '../Api/Weather';
import tempOutImg from '../img/temp-out.png';
import tempInImg from '../img/temp-in.png';

class Home extends React.Component {

  state = {
    insideTemp: 'N/A',
    desiredTemp: 'N/A',
    weather: {main:{temp:'N/A'}},
  }

  componentDidMount() {
    Temperature.getInsideTemperature().then(res => this.setState({ insideTemp: res.data }));
    Temperature.getDesiredTemperature().then(res => this.setState({ desiredTemp: res.data }));
    Weather.getLocalWeather().then(res => this.setState({ weather: res.data }));
  }

  round(value) {
    return Math.round(value*2)/2;
  }

render() {
  var {insideTemp, desiredTemp, weather } = this.state;

  return (
    <div class="Home">
      <div class="single-chart">
      <p class="outside-text"><img src={tempInImg} /> {this.round(insideTemp)}°C</p> 
        <svg viewBox="0 0 36 36" class="circular-chart orange" xmlns="http://www.w3.org/2000/svg">
          <path class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path class="circle"
            stroke-dasharray="80, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="inside-text">{this.round(desiredTemp)}°C</text> 
        </svg>
      </div>
      <p class="outside-text"><img src={tempOutImg} /> {this.round(weather.main.temp)}°C</p> 
    </div>
  );
}
}

export default Home;
