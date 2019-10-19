import React from 'react';
import { SquareItem } from '../SquareItem';
import './index.css';

const mockData = [
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/0',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  },
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/1',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  },
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/2',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  },
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/3',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  },
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/4',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  },
  {
    image: 'https://picsum.photos/565', 
    link: 'shop/5',
    title: 'Lorem ipsum',
    desc: 'Voluptate dolor nostrud officia eiusmod dolore pariatur ut.'
  }
];

const HoverComponentDefault = ({title, desc, className}) => {
  return (
    <div className={className} style={{
      textAlign: 'center',
    }}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

const Carousel = ({
  title='BEST SELLERS',
  items=mockData,
  HoverComponent=HoverComponentDefault,
  hoverProps=['title', 'desc']
}) => {
  return (
    <div className='carousel_wrapper'>
      <h3>{title}</h3>
      <div className='carousel'>
        {items.map(item => (
          <SquareItem key={item.link} HoverComponent={HoverComponent} hoverProps={hoverProps} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Carousel;
