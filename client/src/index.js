import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import appStore from './flux/AppStore';
import { ActionsCreator } from './flux/Actions';
const Dispatcher = require('flux').Dispatcher;

const dispatcher = new Dispatcher();
appStore.init(dispatcher);
const actionsCreator = new ActionsCreator(dispatcher);
actionsCreator.loadData();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
