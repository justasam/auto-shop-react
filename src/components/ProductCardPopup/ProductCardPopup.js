import React from 'react';
import './index.css';

import { CarouselThumbnails } from '../CarouselThumbnails';



const ProductCardPopup = props => {
  return (
    <div>
      <h3>ProductCardPopup</h3>
      <CarouselThumbnails style={{
        maxWidth: 500,
        height: 500,
        margin: 20
      }} />
    </div>
  )
}

export default ProductCardPopup;
