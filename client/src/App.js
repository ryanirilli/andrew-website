// @flow

import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/home/Home";

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
