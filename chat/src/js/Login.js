import React, {Component, PropTypes} from 'react'
import { Router, Route, Link, browserHistory , IndexRoute , IndexLink} from 'react-router';

class Login extends Component {
    render () {
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                    <Link to="/">Home</Link>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/chat" activeClassName="active">About</Link></li>

                    </ul>
                </menu>
                {this.props.children}
            </div>
        )
    }
}

export default Login