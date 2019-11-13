import React from 'react';
import { ProductCardAlt } from '../../components/ProductCardAlt';
import './index.css';

const PartsAlt = props => {
  return (
    <div>
      <h3>PartsAlt</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: 20,
        margin: '0 20px',
        boxSizing: 'border-box',
        justifyItems: 'center',
        maxWidth: '100vw',
        overflow: 'hidden'
      }} className='parts_alt_wrapper'>
        <div>
          <ProductCardAlt title='Part Title' price='145$' image='https://picsum.photos/565' />
        </div>
        <div>
          <ProductCardAlt title='Part Title' price='145$' image='https://picsum.photos/565' />
        </div>
        <div>
          <ProductCardAlt title='Part Title' price='145$' image='https://picsum.photos/565' />
        </div>
      </div>
    </div>
  )
}

export default PartsAlt;
