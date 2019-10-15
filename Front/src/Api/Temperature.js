import axios from 'axios';

export default class Temperature {
  static async getInsideTemperature ()
  {
    return axios.get(`http://localhost:3001/temperature/inside`)
  }

  static async getDesiredTemperature ()
  {
    return axios.get(`http://localhost:3001/temperature/desired`)  
  }
}
