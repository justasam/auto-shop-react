import React from 'react';
import { ProductCardAlt } from '../../components/ProductCardAlt';
import { ProductCardPopup } from '../../components/ProductCardPopup';
import { DropdownAlt } from '../../components/Inputs';
import './index.css';

const PartsAlt = props => {
  return (
    <div>
      <h3 style={{
        padding: '10px 20px',
        fontSize: 22
      }}>PartsAlt</h3>
      <div className='parts_alt_filters'>
        <DropdownAlt title='MODEL:' name='model' options={[
          {value: 'golf_3', name: 'Golf 3'},
          {value: 'loremipsum', name: 'lorem'}
        ]} />
        <DropdownAlt title='PRICE MIN:' name='model' options={[
          {value: '50', name: '50$'},
          {value: 'loremipsum', name: 'lorem'}
        ]} />
        <DropdownAlt title='PRICE MAX:' name='model' options={[
          {value: '200', name: '200$'},
          {value: 'loremipsum', name: 'lorem'}
        ]} />
      </div>
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
      <ProductCardPopup />
    </div>
  )
}

export default PartsAlt;
