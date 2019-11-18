import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ProductCardAlt } from '../../components/ProductCardAlt';
import { ProductCardPopup } from '../../components/ProductCardPopup';
import { DropdownAlt } from '../../components/Inputs';
import { ChevronLeft, ChevronRight } from 'react-feather';
import './index.css';

const getPageFromSearch = search => {
  if (!search) return 1;
  let splitSearch = search.split('p=')
  if (splitSearch.length !== 2) return 1;
  return parseInt(splitSearch[1].split('&')[0]);
}

const getSearchFromPage = page => `?p=${page}`;

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function setQuery(name, val, query) {
  if (val === 'any') {
    delete query[name];
  } else {
    query[name] = val;
  }
  var esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => esc(k) + '=' + esc(query[k]))
    .join('&');
}

const PerPage = 5;

const PartsAlt = withRouter(props => {
  let [parts, setParts] = useState([]);

  let query = parseQuery(props.location.search);
  query.page_number = query.page_number || 1;
  query.per_page = PerPage;

  let [pagesMax, setPagesMax] = useState(1);
  console.log(query);

  useEffect(() => {
    console.log('getData');
    let getData = async () => {
      const res = await fetch('autoshop/api/vehicles/query', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const jsonRes = await res.json();
      setPagesMax(Math.ceil(jsonRes.total / PerPage));
      setParts(jsonRes.objects);
    };

    getData();
  }, [query]);

  return (
    <div>
      <h3 style={{
        padding: '10px 20px',
        fontSize: 22
      }}>PartsAlt</h3>
      <div className='parts_alt_filters'>
        <DropdownAlt title='MODEL:' name='model' value={
          query.model || 'any'
        } onChange={
          (value) => window.location.query = setQuery('model', value, query)
        }
          options={[
            { value: 'any', name: 'Any' },
            { value: 'golf_3', name: 'Golf 3' },
            { value: 'loremipsum', name: 'lorem' }
          ]} />
        <div className='parts_alt_pagination'>
          <h3>Page {query.page_number}</h3>
          <Link to={{
            search: setQuery('page_number', page - 1, query)
          }} className={`link ${query.page_number <= 1 ? 'disabled' : ''}`}>
            <ChevronLeft />
          </Link>
          <Link to={{
            search: setQuery('page_number', page + 1, query)
          }} className={`link ${query.page_number >= pagesMax ? 'disabled' : ''}`}>
            <ChevronRight />
          </Link>
        </div>
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
        {parts.length > 0 ?
          parts.map((part, i) =>
            <ProductCardAlt
              index={i + ''}
              id={part.id}
              title={`${part.make.toUpperCase()} - ${part.model} (${part.year})`}
              description={part.description}
              price={part.price}
              image={part.images[0]}
            />
          )
          : <p style={{
            textAlign: 'center'
          }}>Loading...</p>}
      </div>
      {props.location.hash && parts.length > 0 ?
        <ProductCardPopup
          data={parts[parseInt(props.location.hash.split('#')[1])]}
        /> : null}
    </div>
  )
});

export default PartsAlt;
