import React from 'react';
import './index.css';

import { XCircle } from 'react-feather';

import { CarouselThumbnails } from '../CarouselThumbnails';


const ProductCardPopup = ({data, style={}, styleMain={}}) => {
  let data2 = [];

  for (let spec in JSON.parse(data.specification)) {
    console.log(spec);
  }

  if(!data.account_type) {
    data.account_type = "guest";
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.5)',
      ...styleMain
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
        borderRadius: 4,
        ...style
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
          }} items={data.images}/>
          <div>
            {(() => {
              if(data.account_type == "employee" || data.account_type == "admin") {
                return (<button type="button">DELIST</button>)
              }

              if(data.account_type == "customer") {
                return (<button type="button">ENQUIRE</button>)
              }

              return null;

            })()}
          </div>
        </div>
        <div>
          <h2>{data.make.toUpperCase()} - {data.model} ({data.year})</h2>
          <p>{data.description}</p>
          <h1>£ {data.price}</h1>
        </div>
        <div style={{
          border: '2px solid red',
          gridColumn: 'span 2'
        }}>
          <p>{data.specificaction}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCardPopup;
