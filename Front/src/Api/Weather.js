import axios from 'axios'; 

export default class Weather {
  static async getLocalWeather() {
    return axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        id: 'e1f43933f8230cdbf1c52aa71168aed2',
        appid: '2803183',
        units: 'metric'
      }
    })
  }
}