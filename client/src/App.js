import React, { Component } from 'react';
// import './App.css';

class App extends Component {
  onHandleLogin() {
    const popupWindow = window.open('http://localhost:3001/auth/steam', '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      if (event.origin !== "localhost:3001") return;

      const { token, ok } = event.data;

      if (ok) {
        localStorage.setItem('authToken', token);
        console.log(token);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Steam JWT Login</h1>
        <img
          onClick={this.onHandleLogin}
          src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
          alt="Login with Steam"
        />
      </div>
    );
  }
}

export default App;