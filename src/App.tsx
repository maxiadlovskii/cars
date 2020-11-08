import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {routes} from "./constants/routes";

import './App.css';
import {CarsList} from "./components";

function App() {
  return (
      <div className="App">
          <Switch>
              <Route exact path={routes.carList} component={CarsList} />
              <Redirect to={routes.carList} />
          </Switch>
      </div>
  );
}

export default App;
