import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SquareItem = ({item, HoverComponent, hoverProps, width='auto', height='auto'}) => {
  let newProps = {};
  hoverProps.forEach(prop => {newProps[prop] = item[prop]});

  return (
    <div className='square_item' style={{
      width,
      height
    }}>
      <Link to={item.link}>
        <img src={item.image} alt='Item pic'></img>
      </Link>
      <HoverComponent {...newProps} className='hover_component' />
    </div>
  )
}

export default SquareItem;
