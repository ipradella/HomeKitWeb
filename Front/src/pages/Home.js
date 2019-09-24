import React from 'react';
import './Home.css';
import axios from 'axios';

class Home extends React.Component {

  componentDidMount() {
    axios.get(`https://localhost:3001/inside`)
      .then(res => {
        this.setState({ insideTemp: res });
      })
  }

render() {

  return (
    <div className="Home">
        <div class="selector">
          <button>{this.State.insideTemp} Consigne</button>
        </div>
    </div>
  );
}
}

export default Home;
