import React, { Component } from 'react';
import HeaderBar from "./utils/HeaderBar";
import Home from "./pages/Home";
import GameResult from "./pages/GameResult";
import UserResult from "./pages/UserResult";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import './App.css';

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <HeaderBar></HeaderBar>
        <Container>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={GameResult} />
                <Route path="/user" component={UserResult} />
                <Route component={Home} />
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;