import React, { Component } from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

class App extends React.Component {
    render () {
        return (
            // <Greeter salutation="Hello World"></Greeter>
            <Greeter></Greeter>
        )
    }
}

render(<App />, document.getElementById('root'));
