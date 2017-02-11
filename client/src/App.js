import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import Itinerary from './components/itinerary';
import AppStore from './flux/AppStore';
const Dispatcher = require('flux').Dispatcher;

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

// example api use
// TODO put this call somewhere sensible
// TODO send parameters to server - check out `server/src/api/server.js`
var dispatcher = new Dispatcher();
const appStore = new AppStore(dispatcher);
dispatcher.dispatch({actionType: 'test'});
console.log('fetching results from server...');

fetch('http://localhost:4000/api/search')
.then((response) => {
  return response.json();
})
.then((results) => {
  console.log('TODO: something with these results:');
  console.log(results);
})
.catch(console.error);

export default App;
