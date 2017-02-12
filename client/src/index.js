import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import appStore from './flux/AppStore';
import { actionsCreator } from './flux/Actions';
const Dispatcher = require('flux').Dispatcher;

const dispatcher = new Dispatcher();
appStore.init(dispatcher);
actionsCreator.init(dispatcher);
actionsCreator.loadData(appStore.itineraries.length);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
