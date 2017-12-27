import "../css/main.less"
import React from "react"
import ReactDOM from "react-dom"
import ChatStore from "./ChatStore"
import ChatList from "./ChatList"
import Login from "./Login"
import { Router, Route, Link, browserHistory , IndexRoute , IndexLink} from 'react-router';

const app = document.getElementById("app")


ReactDOM.render((
     <Router history={browserHistory} >
    <Route path="/" component={Login}>
      <IndexRoute component={Login} />
      <Route path="chat" component={ChatList} store={ChatStore}/>
    </Route>
  </Router>
), app)

