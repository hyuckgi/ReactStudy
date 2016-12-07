import React, { Component } from 'react';
import { render } from 'react-dom';
import {Container} from 'flux/utils';
import Autosuggest from 'react-autosuggest-legacy';
import AirportStore from './stores/AirportStore';
import AirportActionCreators from './actions/AirportActionCreators';

class App extends Component {
    getSuggestions(input, callback) {
        const escapedInput = input.trim().toLowerCase();
        const airportMatchRegex = new RegExp('\\b' + escapedInput, 'i');
        const suggestions = this.state.airports
            .filter(airport => airportMatchRegex.test(airport.city))
            .sort((airport1, airport2) => {
                return airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput)
            })
            .slice(0, 7)
            .map(airport => `${airport.city} - ${airport.country} (${airport.code})`);
        callback(null, suggestions);
    }

    componentDidMount() {
        AirportActionCreators.fetchAirports();
    }

    render(){
        return(
            <div>
                <header>
                    <div className="header-brand">
                        <img src="logo.png" height="35" />
                        <p>Check discount ticket prices and using your AirCheap point</p>
                    </div>
                    <div className="header-route">
                        <Autosuggest id="origin"
                            suggestions={this.getSuggestions.bind(this)}
                            inputAttributes={{placeholder : 'From'}}
                            />
                        <Autosuggest id="destination"
                            suggestions={this.getSuggestions.bind(this)}
                            inputAttributes={{placeholder : 'To'}} />
                    </div>
                </header>
            </div>
        );
    }
}


App.getStores = () => ([AirportStore]);
App.calculateState = (prevState) => ({
    airports : AirportStore.getState()
});


const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));
