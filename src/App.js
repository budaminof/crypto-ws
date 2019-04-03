/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import './App.scss';
import Data from './Data.component';

const URL = 'wss:ws-sandbox.kraken.com';
const subscribe = {
  event: "subscribe",
  pair: [
    "XBT/USD"
  ],
  "subscription": {
    name: "ohlc",
    interval: 5
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
      if (Array.isArray(message)) {
        this.setState({ data: message[1] });
      }
    }

    this.state.ws.onclose = () => {
      console.log('disconnected');
      this.setState({ ws: new WebSocket(URL) })
    }
  }

  render() {
    return (
      <div className="App">
        <header className={this.state.data.length ? 'short-App-header' : 'App-header'}>
          <h2>
            XBT WATCH
          </h2>
          {this.state.data.length ? null : <h3>connecting to kraken</h3>}
        </header>
        {this.state.data.length ? <Data data={this.state.data} /> : null}
      </div>
    );
  }
}

export default App;
