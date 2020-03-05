import React, { Component } from 'react';
import HeaderBar from "./utils/HeaderBar";
import Home from "./pages/Home";
import GameResult from "./pages/GameResult";
import UserResult from "./pages/UserResult";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppFooter from './utils/AppFooter';
import "./App.css";
import UserSearch from "./utils/UserSearch";
import GameSearch from "./utils/GameSearch";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <HeaderBar />
            <Container>
              <Row>
                <UserSearch></UserSearch>
                <GameSearch></GameSearch>
              </Row>
              <br></br>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={GameResult} />
                <Route path="/user" component={UserResult} />
                <Route component={Home} />
              </Switch>
            </Container>
            <AppFooter />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;