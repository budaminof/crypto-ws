/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

const URL = 'wss:ws-sandbox.kraken.com';
const subscribe = {
  event: "subscribe",
  pair: [
    "XBT/USD"
  ],
  subscription: {
    name: "ticker",
  }
};
class App extends Component {
  state = {
    data: [],
    ws: new WebSocket(URL),
  }

  componentWillMount() {
    this.state.ws.onopen = () => {
      console.log('connected');
      this.state.ws.send(JSON.stringify(subscribe));
    }

    this.state.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      console.log(message);
    }

    this.state.ws.onclose = () => {
      console.log('disconnected');
      this.setState({ ws: new WebSocket(URL) })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            CRYPTO WATCH
          </h2>
        </header>
      </div>
    );
  }
}

export default App;
