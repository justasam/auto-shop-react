import React from 'react';
import './index.css';

import { ChevronLeft, ChevronRight } from 'react-feather';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const ModernArrow = props => {
  const { onClick, className, left=true } = props;
  return (
    <div onClick={onClick} style={{
      display: 'block',
      position: 'absolute',
      cursor: 'pointer',
      zIndex: '99999',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,.5)',
      borderRadius: '4px',
      ...(left ? {
        left: 0,
      } : {
        right: 0
      })
    }}>
      { left ? <ChevronLeft height="100%" width="40px" stroke="black" /> : <ChevronRight height="100%" width="40px" stroke="black" /> }
    </div>
  )
}

const mockData = [
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
  'https://picsum.photos/565',
]

const CarouselThumbnails = ({
  items=mockData,
  ...props
}) => {
  const settings = {
    customPaging: (i) => <a><img src={items[i]} style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }} /></a>,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    appendDots: dots => (
      <Slider
        slidesToShow={7}
        draggable={false}
        style={{
          height: 70
        }}
        nextArrow={<ModernArrow left={false} />}
        prevArrow={<ModernArrow />}
      >
         {dots} 
      </Slider>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ModernArrow left={false} />,
    prevArrow: <ModernArrow />
  };

  return (
    <div className='carousel_wrapper' style={props.style}>
      <Slider {...settings}>
        {items.map((image, i) => (
          <div>
          <img style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} src={image} alt={`${i} picture of vehicle`} key={i}></img>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselThumbnails;
