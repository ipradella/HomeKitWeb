import React from 'react';
import './Home.css';
import axios from 'axios';

class Home extends React.Component {

  state = {
    insideTemp: 'N/A',
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/inside`)
      .then(res => {
        console.log(res);
        this.setState({ insideTemp: res.data });
      })
  }

render() {

  return (
    <div className="Home">
        <div className="selector">
          <button><span>{this.state.insideTemp}°C</span><span>Consigne</span></button>
        </div>
    </div>
  );
}
}

export default Home;
