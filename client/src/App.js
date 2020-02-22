import React, { Component } from 'react';
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