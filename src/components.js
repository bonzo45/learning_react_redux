// src/components.js

import React from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';

function randomColor() {
  return '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
}

export function Rectangle(props) {
  const { name, w, h, onClick } = props;
  return (
    <div className='rectangle' onClick={onClick} style={{width: w, height: h, backgroundColor: randomColor()}}>{name}</div>
  );
}

function createCountry(id, name, width, height, onClick) {
  return <Rectangle key={id} onClick={onClick} name={name} w={width + 'vw'} h={height + 'vh'} />
}

function createCountryFromObject(country, width, height, onClick) {
  return createCountry(country.get('id'), country.get('name'), width, height, onClick);
}

function drawCountries(countries, areaLeft, maxWidth, maxHeight, onClick) {
  // If there is one country, draw it as big as you can.
  const size = countries.size;
  if (size === 1) {
    return createCountryFromObject(countries.get(0), maxWidth, maxHeight, onClick);
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
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight, onClick),
            createCountryFromObject(cont2, maxWidth * (1 - ratio), maxHeight, onClick)
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
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight, onClick),
            drawCountries(countries.shift(), areaLeft * (1 - ratio), maxWidth * (1 - ratio), maxHeight, onClick)
          ])
        }
      </div>
    )
  }

  // If there are four or more:
  // 1  2
  // 3  4+
  else if (size >= 4) {
    const cont1 = countries.get(0);
    const cont2 = countries.get(1);
    const ratio = ((cont1.get('area') + cont2.get('area')) / areaLeft);
    return (
      <div className="world_wrapper_vertical" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
        {
          List([
            drawCountries(countries.setSize(2), areaLeft * ratio, maxWidth, maxHeight * ratio, onClick),
            drawCountries(countries.shift().shift(), areaLeft * (1 - ratio), maxWidth, maxHeight * (1 - ratio), onClick)
          ])
        }
      </div>
    )
  }

  return (
    <div className="world_wrapper">
      {
        countries.map(function(continent) {
          return createCountry(continent.get('id'), continent.get('name'), 20, 20, onClick);
        })
      }
    </div>
  )
}

function WorldMap(props) {
  const { countries, parentWidth, parentHeight, popCountry } = props;
  let maxWidth = (parentWidth === undefined) ? 100 : parentWidth;
  let maxHeight = (parentHeight === undefined) ? 100 : parentHeight;

  if (countries.isEmpty()) {
    return null;
  }

  let totalArea = 0;
  countries.forEach(function(country) {
    totalArea += country.get('area');
  });

  return drawCountries(countries, totalArea, maxWidth, maxHeight, popCountry);
}

function popCountry() {
  return {
    type: 'POP_COUNTRY'
  };
}

export const WorldMapWrapper = connect(
  function mapStateToProps(state) {
    return {
      countries: state
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      popCountry: () => {
        dispatch(popCountry());
      }
    }
  }
)(WorldMap);