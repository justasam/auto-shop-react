import React from 'react';
import { SquareItem } from '../SquareItem';
import './index.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  }
  return (
    <div className='carousel_wrapper'>
      <h3>{title}</h3>
      <Slider {...settings}>
        {items.map(item => (
          <SquareItem key={item.link} HoverComponent={HoverComponent} hoverProps={hoverProps} item={item} />
        ))}
      </Slider>
    </div>
  )
}

export default Carousel;
