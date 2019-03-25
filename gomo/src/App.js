import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Divider } from 'semantic-ui-react';

import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Gomo Video Challange</h1>
        <Divider />
        <Main />
      </div>
    );
  }
}

export default App;
