import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

const URL = 'wss:ws-sandbox.kraken.com'

class App extends Component {
  state = {
    data: [],
    ws: new WebSocket(URL),
  }

  componentWillMount() {
    this.ws.onopen = () => {
      console.log('connected');
    }

    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      this.state.setState({ data: message })
    }

    this.ws.onclose = () => {
      console.log('disconnected');

      this.setState({ socket: new WebSocket(URL) })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
