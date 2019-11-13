import React from 'react';
import './index.css';

const ProductCardAlt = ({image, title, price}) => {
  return (
    <>
      <img src={image} style={{
        objectFit: 'cover',
        maxWidth: '100%'
      }}/>
      <h3>{title}</h3>
      <h3>{price}</h3>
    </>
  )
}

export default ProductCardAlt;
