import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
    fetchAirports() {
        return fetch('airport.json')
            .then((response) => response.json());
    },


    fetchTickets(origin, destination){
        return fetch('flights.json')
            .then( (response) => response.json());
    }
};

export default AirCheapAPI;
