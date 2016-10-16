// src/components.js

import React from 'react';
import { List, Map } from 'immutable';

export function Todo(props) {
  const { todo } = props;
  if(todo.isDone) {
    return <strike>{todo.text}</strike>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export function TodoList(props) {
  const { todos } = props;
  return (
    <div className='todo'>
      <input type='text' placeholder='Add todo' />
      <ul className='todo__list'>
        {todos.map(t => (
          <li key={t.id} className='todo__item'>
            <Todo todo={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

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

function drawCountries(continents, maxWidth, maxHeight) {
  // If there is one country, draw it as big as you can.
  const size = continents.size;
  if (size === 1) {
    return createCountryFromObject(continents.getIn(0), maxWidth, maxHeight);
  }

  // If there are two countries, split into two based on their sizes.
  else if (size === 2) {
    const cont1 = continents.get(0);
    const cont2 = continents.get(1);
    const ratio = cont1.get('area') / (cont1.get('area') + cont2.get('area'));
    return (
      <div className="world_wrapper" style={{width: maxWidth + 'vw', height: maxHeight + 'vh'}}>
        {
          List([
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight),
            createCountryFromObject(cont2, maxWidth - (maxWidth * ratio), maxHeight)
          ])
        }
      </div>
    );
  }

  // If there are three, draw one, recurse other two.
  else if (size == 3) {
    const cont1 = continents.get(0);
    const cont2 = continents.get(1);
    const cont3 = continents.get(2);
    const ratio = cont1.get('area') / (cont1.get('area') + cont2.get('area') + cont3.get('area'));
    const width1 = Math.floor(maxWidth * ratio);
    return (
      <div className="world_wrapper">
        {
          List([
            createCountryFromObject(cont1, maxWidth * ratio, maxHeight),
            drawCountries(continents.shift(), maxWidth - (maxWidth * ratio), maxHeight)
          ])
        }
      </div>
    )
  }

  return (
    <div className="world_wrapper">
      {continents.map(function(continent) {
        return createCountry(continent.get('id'), continent.get('name'), 20, 20);
      })}
    </div>
  )
}

export function WorldMap(props) {
  const { continents, parentWidth, parentHeight } = props;
  let maxWidth = (parentWidth === undefined) ? 100 : parentWidth;
  let maxHeight = (parentHeight === undefined) ? 100 : parentHeight;

  if (continents.isEmpty()) {
    return null;
  }

  return drawCountries(continents, maxWidth, maxHeight);
}