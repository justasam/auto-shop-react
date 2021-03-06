import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SquareItem = ({item, HoverComponent, hoverProps, width='auto', height='auto'}) => {
  let newProps = {};
  hoverProps.forEach(prop => {newProps[prop] = item[prop]});

  return (
    <Link to={item.link}>
      <div className='square_item' style={{
        width,
        height
      }}>
        
        <img src={item.image} alt='Item pic'></img>
      
      <HoverComponent {...newProps} className='hover_component' />
    </div>
    </Link>
  )
}

export default SquareItem;
