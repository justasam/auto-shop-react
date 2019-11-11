import React, { useState } from 'react';
import { Search, ChevronDown } from 'react-feather';
import './index.css';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: event => {
        console.log(event.target.value);
        setValue(event.target.value);
      }
    }
  }
};

const Input = ({width=354, placeholder='Placeholder...', type='text'}) => {
  const { bind } = useInput('');

  return (
    <div style={{
      width: width,
      position: 'relative'
    }}>
      <input type={type} className="input shadow nomp" placeholder={placeholder} {...bind} />
    </div>
  );
}

const SearchInput = ({width=354}) => {
  const { bind } = useInput('');

  return (
    <div style={{
      width: width,
      position: 'relative'
    }}>
      <input type="text" className="input shadow nomp" placeholder="Tesla Model S..." {...bind} />
      <Search size={25} height={50} color='#757575' className="input_label_right"/>
    </div>
  )
}

const Dropdown = ({name, options, width=170}) => {
  return (
    <div style={{
      width: width,
      position: 'relative'
    }}>
      <select name={name} className="input shadow nomp select">
        {options.map((opt, i) => 
          <option value={opt.value} key={i}>{opt.name}</option>
        )}
      </select>
      <ChevronDown size={30} color='#757575' height={50} className="select_icon" />
    </div>
  )
}

const Button = ({name, onClick, width=205, className}) => {
  return (
    <button onClick={onClick} style={{
      width: width
    }} className={`button shadow ${className ? className : ''}`}>{name}</button>
  )
}

export { SearchInput, Dropdown, Button, Input };