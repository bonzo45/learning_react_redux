// src/components.js

import React from 'react';
import { List, Map } from 'immutable';

function randomColor() {
  return '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
}

export function Rectangle(props) {
  const { name, w, h } = props;
  return (
    <div className='rectangle' style={{width: w, height: h, backgroundColor: randomColor()}}>{name}</div>
  );
}

function createCountry(id, name, width, height) {
  return <Rectangle key={id} name={name} w={width + 'vw'} h={height + 'vh'} />
}

function createCountryFromObject(country, width, height) {
  return createCountry(country.get('id'), country.get('name'), width, height);
}

function drawCountries(countries, areaLeft, maxWidth, maxHeight) {
  // If there is one country, draw it as big as you can.
  const size = countries.size;
  if (size === 1) {
    return createCountryFromObject(countries.getIn(0), maxWidth, maxHeight);
  }

  // If there are two countries, split into two based on their sizes.
  else if (size === 2) {
    const cont1 = countries.get(0);
    const cont2 = countries.get(1);
    const ratio = cont1.get('area') / (cont1.get('area') + cont2.get('area'));
    return (
      <div className="world_wrapper" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
        {
          List([
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight),
            createCountryFromObject(cont2, maxWidth * (1 - ratio), maxHeight)
          ])
        }
      </div>
    );
  }

  // If there are three, draw one, recurse other two.
  else if (size == 3) {
    const cont1 = countries.get(0);
    const cont2 = countries.get(1);
    const cont3 = countries.get(2);
    const ratio = cont1.get('area') / (cont1.get('area') + cont2.get('area') + cont3.get('area'));
    return (
      <div className="world_wrapper" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
        {
          List([
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight),
            drawCountries(countries.shift(), areaLeft * (1 - ratio), maxWidth * (1 - ratio), maxHeight)
          ])
        }
      </div>
    )
  }

  else if (size >= 4) {
    const cont1 = countries.get(0);
    const cont2 = countries.get(1);
    const ratio = ((cont1.get('area') + cont2.get('area')) / areaLeft);
    /* 1  2
       3  rest
       */
    return (
      <div className="world_wrapper_vertical" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
        {
          List([
            drawCountries(countries.setSize(2), areaLeft * ratio, maxWidth, maxHeight * ratio),
            drawCountries(countries.shift().shift(), areaLeft * (1 - ratio), maxWidth, maxHeight * (1 - ratio))
          ])
        }
      </div>
    )

  }

  return (
    <div className="world_wrapper">
      {
        countries.map(function(continent) {
          return createCountry(continent.get('id'), continent.get('name'), 20, 20);
        })
      }
    </div>
  )
}

export function WorldMap(props) {
  const { countries, parentWidth, parentHeight } = props;
  let maxWidth = (parentWidth === undefined) ? 100 : parentWidth;
  let maxHeight = (parentHeight === undefined) ? 100 : parentHeight;

  if (countries.isEmpty()) {
    return null;
  }

  let totalArea = 0;
  countries.forEach(function(country) {
    totalArea += country.get('area');
  });

  return drawCountries(countries, totalArea, maxWidth, maxHeight);
}