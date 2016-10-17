import React from 'react';

import Rectangle from './rectangle';

class Country extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, name, width, height, onClick } = this.props;
    const clickMe = id => event => onClick(id);
    return <Rectangle key={id} onClick={clickMe(id)} name={name} w={width + 'vw'} h={height + 'vh'} />
  }
}

export default Country;