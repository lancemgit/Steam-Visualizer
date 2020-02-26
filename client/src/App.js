import React, { Component } from 'react';
import HeaderBar from "./utils/HeaderBar";
import Home from "./pages/Home";
import GameResult from "./pages/GameResult";
import UserResult from "./pages/UserResult";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import './App.css';

class App extends Component {
  onHandleLogin() {
    const popupWindow = window.open('http://localhost:3001/auth/steam', '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      const { token } = event.data;
      localStorage.setItem('authToken', token);

      let base64Token = token.split('.')[1].replace('-', '+').replace('_', '/');
      let payload = JSON.parse(atob(base64Token)).user;
      localStorage.setItem("user", JSON.stringify(payload));
    });
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