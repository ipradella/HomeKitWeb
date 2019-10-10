import React from 'react';
import './Home.css';
import axios from 'axios';

class Home extends React.Component {

  state = {
    insideTemp: 'N/A',
    desiredTemp: 'N/A',
    value: 0,
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/temperature/inside`)
      .then(res => {
        console.log(res);
        this.setState({ insideTemp: res.data });
      });
      axios.get(`http://localhost:3001/temperature/desired`)
      .then(res => {
        console.log(res);
        this.setState({ desiredTemp: res.data });
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
