import React from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';

import { removeCountry } from './actions';
import Country from './country';

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
  }

  createCountry(country, width, height, onClick) {
    return <Country id={country.get('id')} name={country.get('name')} width={width} height={height} onClick={onClick} />
  }

  renderCountries(countries, areaLeft, maxWidth, maxHeight, onClick) {
    // If there is one country, fill the remaining space.
    const size = countries.size;
    if (size === 1) {
      return this.createCountry(countries.get(0), maxWidth, maxHeight, onClick);
    }

    // If there are two countries, split into two based on their sizes.
    else if (size === 2) {
      const c1 = countries.get(0);
      const c2 = countries.get(1);
      const ratio = c1.get('area') / (c1.get('area') + c2.get('area'));
      return (
        <div className="world_wrapper" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
          {
            List([
              this.createCountry(c1, maxWidth * ratio, maxHeight, onClick),
              this.createCountry(c2, maxWidth * (1 - ratio), maxHeight, onClick)
            ])
          }
        </div>
      );
    }

    // If there are three, draw one, recurse other two.
    else if (size == 3) {
      const c1 = countries.get(0);
      const c2 = countries.get(1);
      const c3 = countries.get(2);
      const ratio = c1.get('area') / (c1.get('area') + c2.get('area') + c3.get('area'));
      return (
        <div className="world_wrapper" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
          {
            List([
              this.createCountry(c1, maxWidth * ratio, maxHeight, onClick),
              this.renderCountries(countries.shift(), areaLeft * (1 - ratio), maxWidth * (1 - ratio), maxHeight, onClick)
            ])
          }
        </div>
      )
    }

    // If there are four or more:
    // 1  2
    // 3  4+
    else if (size >= 4) {
      const c1 = countries.get(0);
      const c2 = countries.get(1);
      const ratio = ((c1.get('area') + c2.get('area')) / areaLeft);
      return (
        <div className="world_wrapper_vertical" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
          {
            List([
              this.renderCountries(countries.setSize(2), areaLeft * ratio, maxWidth, maxHeight * ratio, onClick),
              this.renderCountries(countries.shift().shift(), areaLeft * (1 - ratio), maxWidth, maxHeight * (1 - ratio), onClick)
            ])
          }
        </div>
      )
    }
  }

  render() {
    const { countries, filter, parentWidth, parentHeight, removeCountry } = this.props;
    let maxWidth = (parentWidth === undefined) ? 100 : parentWidth;
    let maxHeight = (parentHeight === undefined) ? 100 : parentHeight;

    let filteredCountries;
    if (filter === 'ALL') {
      filteredCountries = countries;
    }
    else {
      filteredCountries = countries.filter(country => country.get('continent') === filter);
    }

    if (filteredCountries.isEmpty()) {
      return null;
    }

    let totalArea = 0;
    filteredCountries.forEach(function(country) {
      totalArea += country.get('area');
    });

    return this.renderCountries(filteredCountries, totalArea, maxWidth, maxHeight, removeCountry);
  }
}

WorldMap = connect(
  function mapStateToProps(state) {
    return {
      countries: state.get('countries'),
      filter: state.get('filter')
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      removeCountry: (id) => dispatch(removeCountry(id))
    }
  }
)(WorldMap);

export default WorldMap;