import React from 'react';
import './index.css';

import { XCircle } from 'react-feather';

import { CarouselThumbnails } from '../CarouselThumbnails';



const ProductCardPopup = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.5)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '600px 1fr',
        gap: 20,
        width: '1000px',
        maxWidth: '80vw',
        height: '1000px',
        maxHeight: '80vw',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 4
      }} className='shadow'>
        <XCircle size={40} style={{
          position: 'absolute',
          zIndex: 9999,
          right: 10,
          top: 10,
          cursor: 'pointer'
        }} className='close_icon' onClick={() => {
          window.location.hash = '';
        }} />
        <div style={{
          position: 'relative'
        }}>
          <CarouselThumbnails style={{
            position: 'absolute',
            display: 'block',
            maxWidth: '100%',
            overflow: 'hidden',
            paddingBottom: 50
          }} />
        </div>
        <div>
          <h2>BMW X1 (2014)</h2>
          <p>XDRIVE18D XLINE 2.0 5dr</p>
          <h1>$11,800</h1>
        </div>
        <div style={{
          border: '2px solid red',
          gridColumn: 'span 2'
        }}></div>
      </div>
    </div>
  )
}

export default ProductCardPopup;
