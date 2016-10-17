import React from 'react';

function randomColor() {
  return '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
}

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, w, h, onClick } = this.props;
    return (
      <div className='rectangle' onClick={onClick} style={{width: w, height: h, backgroundColor: randomColor()}}>{name}</div>
    );
  }
}

export default Rectangle;