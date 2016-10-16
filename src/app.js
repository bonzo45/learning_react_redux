// src/app.js

import React from 'react';
import ReactDOM from 'react-dom';
import { WorldMap } from './components';

import { List, Map } from 'immutable';

const continents = List([
  Map({id: 0, name: 'Asia',                 area: 44579000}),
  Map({id: 1, name: 'Africa',               area: 30065000}),
  Map({id: 2, name: 'North America',        area: 24256000}),
  Map({id: 3, name: 'South America',        area: 17819000}),
  Map({id: 4, name: 'Antarctica',           area: 13209000}),
  Map({id: 5, name: 'Europe',               area:  9938000}),
  Map({id: 6, name: 'Australia + Oceania',  area:  2968000})
]);

ReactDOM.render(
  <WorldMap countries={continents} />, document.getElementById('app')
);