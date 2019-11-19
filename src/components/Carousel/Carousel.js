import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { SquareItem } from '../SquareItem';
import { ChevronLeft, ChevronRight } from 'react-feather';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './index.css';
import { ProductCardPopup } from '../ProductCardPopup';

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

const ModernArrow = props => {
  const { onClick, className, left = true } = props;
  return (
    <div onClick={onClick} className={className} style={{
      width: 100,
      height: '100%',
      backgroundColor: '#eee',
      display: 'block',
    }}>
      {left ? <ChevronLeft height="100%" width="40px" stroke="black" /> : <ChevronRight height="100%" width="40px" stroke="black" />}
    </div>
  )
}

const Carousel = withRouter(({
  title = 'BEST SELLING MAKES',
  items = mockData,
  height = 'auto',
  showPopup = false,
  ...props
}) => {
  const settings = {
    dots: false,
    slidesToShow: Math.min(3, items.length),
    slidesToScroll: 1,
    nextArrow: <ModernArrow left={false} />,
    prevArrow: <ModernArrow />,
  };

  let swiping = false;
  let carouselRef = React.createRef();

  let handleMouseDown = event => {
    event.preventDefault();
  }
  let handleMouseUp = () => {
    swiping = carouselRef.current.innerSlider.state.swiping;
  }
  let handleClick = event => {
    if (swiping) {
      event.preventDefault();
    }
  }

  return (
    <div className='carousel_wrapper' style={{
      position: 'relative',
      overflow: 'hidden',
      margin: 25,
      maxWidth: '100vw',
      padding: '20px 0px',
      height: height
    }}>
      <h3>{title}</h3>
      <Slider {...settings} style={{
        position: 'relative',
        display: 'block',
        padding: '0 100px'
      }} ref={carouselRef}>
        {items.map((item, i) => {
          item.title = item.title || (item.make + ' ' + item.model);
          item.image = item.image || item.images[0];
          item.description = item.description || '';
          return (
            <div style={{
              border: '2px solid red',
              margin: '0 10px'
            }} key={i} onClickCapture={handleClick} onMouseUpCapture={handleMouseUp} onMouseDownCapture={handleMouseDown}>
              <Link to={showPopup ? `#${i}` : `/Vehicles?make=${item.title}`}>
                <img style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} src={item.image} alt={item.title}></img>
              </Link>
              <h4>{
                item.title.length > 0 &&
                item.title[0].toUpperCase() + item.title.slice(1)
              }</h4>
              <h5>{
                item.description.length > 0 &&
                item.description[0].toUpperCase() + item.description.slice(1)
              }</h5>
            </div>
          );
        })}
      </Slider>
      {props.location.hash && showPopup ? <ProductCardPopup data={items[parseInt(props.location.hash.split('#')[1])]} /> : null}
    </div>
  )
});

export default Carousel;
