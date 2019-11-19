import React from 'react';
import './index.css';

import { XCircle } from 'react-feather';

import { CarouselThumbnails } from '../CarouselThumbnails';


const ProductCardPopup = ({data, style={}, styleMain={}}) => {
  let specElements = [];
  let specChildren;
  let specification = JSON.parse(data.specification);
  for (let spec in specification) {
    specChildren = [];
    for (let spec2 in specification[spec]) {
      specChildren.push(
        <p className='specification_content'>{spec2}: {specification[spec][spec2]}</p>
      )
    }
    specElements.push(
      <div className='specification_wrapper'>
        <h2 className='specification_head'>{spec}</h2>
        {specChildren}
      </div>
    );
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
        maxHeight: '80vh',
        overflowY: 'auto',
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
          position: 'relative',
          overflow: 'hidden',
        }}>
          <CarouselThumbnails style={{
            display: 'block',
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
          border: '2px solid #eee',
          gridColumn: 'span 2',
          position: 'relative',
          padding: '0',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {specElements}
        </div>
      </div>
    </div>
  )
}

export default ProductCardPopup;
