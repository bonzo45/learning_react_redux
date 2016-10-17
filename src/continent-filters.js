import React from 'react';
import { connect } from 'react-redux';

import ContinentFilter from './continent-filter';
import { filterByContinent } from './actions';

class ContinentFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { continents, setFilter } = this.props;
    const clickMe = name => event => setFilter(name);
    return (
      <div>
        {
          continents.map(continent => <ContinentFilter name={continent} onClick={clickMe(continent)} />)
        }
      </div>
    )
  }
}

ContinentFilters = connect(
  function mapStateToProps(state) {
    return {
      filter: state.get('filter'),
      continents: state.get('continents')
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      setFilter: (name) => dispatch(filterByContinent(name))
    }
  }
)(ContinentFilters);

export default ContinentFilters;