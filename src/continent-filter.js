import React from 'react';
import { connect } from 'react-redux';

class ContinentFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, currentFilter, onClick } = this.props;
    return (
      <div 
        className={(currentFilter !== name) ? "continent_filter" : "continent_filter_inverse"}
        onClick={onClick}
        >
        {name}
      </div>
    );
  }
}

ContinentFilter = connect(
  function mapStateToProps(state) {
    return {
      currentFilter: state.get('filter')
    }
  },
  null
)(ContinentFilter);

export default ContinentFilter;