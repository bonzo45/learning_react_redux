// src/app.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Map } from 'immutable';

import { countries, continents } from './data';
import WorldMap from './world-map';
import ContinentFilters from './continent-filters';

const init = Map({
  filter: 'Ocean',
  countries: countries,
  continents: continents
});

function reducer(state = init, action) {
  switch (action.type) {
    case 'REMOVE_COUNTRY':
      return state.set('countries', state.get('countries').filter((country) => country.get('id') !== action.id));
    case 'FILTER_CONTINENT':
      return state.set('filter', action.name);
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

ReactDOM.render(
  (
    <Provider store={store}>
      <ContinentFilters />
    </Provider>
  )
  , document.getElementById('bar')
);