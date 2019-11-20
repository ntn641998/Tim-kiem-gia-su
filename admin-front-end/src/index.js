import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Home from './components/index/App';
import Login from './components/login/LoginView';
import Register from './components/register/RegisterView';
import Profile from './components/profile/ProfileView';

export default function App(){
    return (
      <Router>
        <div>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route path="/register">                    
                    <Register />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
             </Switch>
        </div>
      </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
