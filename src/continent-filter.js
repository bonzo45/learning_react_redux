import React from 'react';

class ContinentFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, onClick } = this.props;
    return <span onClick={onClick}>{name}</span>
  }
}

export default ContinentFilter;