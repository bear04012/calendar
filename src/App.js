import React, { Component } from 'react';
import './App.css';

import Calendar from './containers/Calendar';

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <Calendar />
      </div>
    )
  }
}

export default App;
