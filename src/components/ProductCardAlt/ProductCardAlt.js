import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.css';

const ProductCardAlt = withRouter(({image, title, price, index, description, location}) => {
  return (
    <div className='product_card_alt'>
      <Link to={{
        search: location.search,
        hash: index
      }}>
        <img src={image} style={{
          objectFit: 'cover',
          maxWidth: '100%',
          position: 'relative',
        }} />
      </Link>
      <h3>{title}</h3>
      <p>{description}</p>
      <h3>£ {price}</h3>
    </div>
  )
})

export default ProductCardAlt;
