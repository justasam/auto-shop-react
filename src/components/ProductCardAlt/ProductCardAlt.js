import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.css';

const ProductCardAlt = withRouter(({id, image, title, price, location}) => {
  return (
    <div className='product-card-alt'>
      <Link to={`${location.pathname}#${id}`}>
        <img src={image} style={{
          objectFit: 'cover',
          maxWidth: '100%',
          position: 'relative',
        }} />
      </Link>
      <h3>{title}</h3>
      <h3>{price}</h3>
    </div>
  )
})

export default ProductCardAlt;
