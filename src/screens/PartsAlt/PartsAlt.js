import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ProductCardAlt } from '../../components/ProductCardAlt';
import { ProductCardPopup } from '../../components/ProductCardPopup';
import { DropdownAlt } from '../../components/Inputs';
import { ChevronLeft, ChevronRight } from 'react-feather';
import './index.css';
import Filters from '../../filters';
const qs = require('query-string');


const PerPage = 9;

const PartsAlt = withRouter(props => {
  let [parts, setParts] = useState([]);
  let [loading, setLoading] = useState(true);

  console.log(props.location.search);

  let query = qs.parse(props.location.search, { parseNumbers: true, arrayFormat: 'bracket'});
  query.page_number = parseInt(query.page_number);
  query.page_number = query.page_number || 1;
  query.per_page = PerPage;
  if (query.seats_to) query.seats_to = parseInt(query.seats_to);
  if (query.seats_from) query.seats_from = parseInt(query.seats_from);

  if (query.price_to) query.price_to = parseInt(query.price_to);
  if (query.price_from) query.price_from = parseInt(query.price_from);

  if (query.milage_to) query.milage_to = parseInt(query.milage_to);
  if (query.milage_from) query.milage_from = parseInt(query.milage_from);

  if (query.engine_to) query.engine_to = parseFloat(query.engine_to);
  if (query.engine_from) query.engine_from = parseFloat(query.engine_from);

  if (query.doors) query.doors = parseInt(query.doors);

  if (query.year_from) query.year_from += '';
  if (query.year_to) query.year_to += '';

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
      setLoading(false);
    };

    getData();
  }, [props.location.search]);

  return (
    <div>
      <h3 style={{
        padding: '10px 20px',
        fontSize: 22
      }}>PartsAlt</h3>
      <div className='parts_alt_filters'>
        {
          Filters.map(({ title, filters, isMultiple }, i) => (
            <DropdownAlt name={title} options={filters} isMulti={isMultiple || false}
              key={i}
              value={
                query[title] ? filters.find((filter) => filter.value === query[title]) : filters[0]
              }
              onChange={
                (selectedOption) => {
                  console.log('dropdown', selectedOption);
                  if (selectedOption.value === 'any') {
                    delete query[title];
                    props.history.push({
                      search: qs.stringify(query)
                    });
                  }
                  else {
                    if (isMultiple) {
                      selectedOption.value = [selectedOption.value, ...(query[title] || [])];
                    }
                    props.history.push({
                      search: qs.stringify({ ...query, [title]: selectedOption.value }, {arrayFormat: 'bracket'})
                    });
                  }
                }
              }
            />)
          )
        }
        <div className='parts_alt_pagination'>
          <h3>Page {query.page_number}</h3>
          <Link to={{
            search: qs.stringify({ ...query, page_number: query.page_number - 1 })
          }} className={`link ${query.page_number <= 1 ? 'disabled' : ''}`}>
            <ChevronLeft />
          </Link>
          <Link to={{
            search: qs.stringify({ ...query, page_number: query.page_number + 1 })
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
          : loading ? <p style={{
            textAlign: 'center'
          }}>Loading...</p> :
            <p style={{
              textAlign: 'center'
            }}>No results.</p>
        }
      </div>
      {props.location.hash && parts.length > 0 ?
        <ProductCardPopup
          data={parts[parseInt(props.location.hash.split('#')[1])]}
        /> : null}
    </div>
  )
});

export default PartsAlt;
