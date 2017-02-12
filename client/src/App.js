import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import ItineraryList from './components/itinerary';
import Loader from './components/loader';
import Searchoptions from './components/searchoptions/SearchOptions.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <Searchoptions
          originPlaceCode='EDI'
          destinationPlaceCode='LON'
          travellersCount='2'
          cabinType='Economy' />

        <ItineraryList />
        <Loader />
      </div>
    );
  }
}

export default App;
