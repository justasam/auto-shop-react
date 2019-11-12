import React from 'react';
import { Link } from 'react-router-dom';
// import { SquareItem } from '../SquareItem';
import { ChevronLeft, ChevronRight } from 'react-feather';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
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

const ModernArrow = props => {
  const { onClick, className, left=true } = props;
  return (
    <div onClick={onClick} className={className} style={{
      width: 100,
      height: '100%',
      backgroundColor: '#eee',
      display: 'block',
    }}>
      { left ? <ChevronLeft height="100%" width="40px" stroke="black" /> : <ChevronRight height="100%" width="40px" stroke="black" /> }
    </div>
  )
}

// const HoverComponentDefault = ({title, desc, className}) => {
//   return (
//     <div className={className} style={{
//       textAlign: 'center',
//     }}>
//       <h4>{title}</h4>
//       <p>{desc}</p>
//     </div>
//   );
// }


const Carousel = data => ({
  title='BEST SELLING MAKES',
  items=data,
}) => {
  console.log(items);
  console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ModernArrow left={false} />,
    prevArrow: <ModernArrow />
  }
  return (
    <div className='carousel_wrapper' style={{
      margin: 25,
      maxWidth: '100vw',
      height: 300
    }}>
      <h3>{title}</h3>
      <Slider {...settings} style={{
        padding: '0 100px'
      }}>
        {items.map((item, i) => (
          <div style={{
            border: '2px solid red',
            margin: '0 10px'
          }} key={i}>
          <Link  to={item.link}>
            <img style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} src={item.image} alt={item.title}></img>
          </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel;
