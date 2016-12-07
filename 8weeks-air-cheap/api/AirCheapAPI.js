import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports() {
    fetch('airport.json')
    .then((response) => {
        return response.json()
    })
    .then((responseData) => {
        //구문 분석된 데이터를 전달하고 AirportActionCreators 성공 액션을 호출한다.
        AirportActionCreators.fetchAirportsSuccess(responseData);
    })
    .catch((error) => {
        // error 객체를 전달하고 AirportActionCreators 오류액션을 호출한다.
        AirportActionCreators.fetchAirportsError(error);
    })
  }
};

export default AirCheapAPI;
