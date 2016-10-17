// src/app.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';

import data from './data';
import WorldMap from './world-map';

const init = Map({
  filter: 'Ocean',
  countries: data
});

function reducer(state = init, action) {
  switch (action.type) {
    case 'REMOVE_COUNTRY':
      return state.set('countries', state.get('countries').filter((country) => country.get('id') !== action.id));
    case 'FILTER_CONTINENT':
      return 
        state.set('filter', action.filter);
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  (
    <Provider store={store}>
      <WorldMap />
    </Provider>
  )
  , document.getElementById('app')
);