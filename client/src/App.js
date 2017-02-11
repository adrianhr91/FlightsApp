import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import ItineraryList from './components/itinerary';
import Loader from './components/loader';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav/>
        // TODO header
        // TODO placeholder controls
        // TODO results component

				<ItineraryList />
				<Loader />
      </div>
    );
  }
}

export default App;
