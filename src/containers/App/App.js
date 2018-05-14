import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import HomePage from '../HomePage';
import NewPage from '../NewPage';

class App extends Component {
  render () {
    return (
      <div className="app-container">
        <main >
          <Switch>
            <Route path="/rules" component={NewPage}/>
            <Route exact path="/" render={() => <HomePage />}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
