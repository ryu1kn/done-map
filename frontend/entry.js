
require('./app.css');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import ActionInventory from './script/ActionInventory';
import Reducer from './script/Reducer';
import DoneMapApp from './script/component/DoneMapApp.react';

const reducer = new Reducer();
const store = Redux.createStore(reducer.reduce);
const inventory = new ActionInventory({$, store});  // TODO: Replace $ with http client

ReactDOM.render(
  <DoneMapApp store={store} actionInventory={inventory} />,
  document.getElementById('app-root')
);
