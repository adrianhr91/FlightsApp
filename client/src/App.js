import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import Itinerary from './components/itinerary';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav/>
        // TODO header
        // TODO placeholder controls
        // TODO results component

				<Itinerary />
      </div>
    );
  }
}

export default App;
