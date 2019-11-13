import React, { useState } from 'react';
import { Search, ChevronDown } from 'react-feather';
import './index.css';

const validationFunctions = {
  isntEmpty: (data) => data !== '',
};

const runValidation = (value, validate) => {
  let valid = true;
  if (validate.length > 0) {
    validate.map((name) => {
      if (!valid) return false;
      valid = validationFunctions[name](value);
    });
  }
  return valid;
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  }
};

const Input = React.forwardRef(({width=354, placeholder='Placeholder...', type='text', validate, ...props}, ref) => {
  const { value, bind } = useInput('');

  let valid = runValidation(value, validate);

  return (
    <div style={{
      width: width,
      position: 'relative'
    }}>
      <input type={type} style={{
        borderColor: 'red',
        borderStyle: !valid ? 'solid' : 'none'
      }} className="input shadow nomp" placeholder={placeholder} {...bind} ref={ref} {...props} />
    </div>
  );
});

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

const DropdownAlt = ({name, options, title}) => {
  return (
    <div className='dropdownalt'>
      <span className='textshadow nomp selectalt_title'>{title}</span>
      <select name={name} className='textshadow nomp select selectalt'>
        {options.map((opt, i) =>
          <option value={opt.value} key={i}>{opt.name}</option>
        )}
      </select>
      <ChevronDown size={24} color='#000' height={24} className='selectalt_icon' />
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

export { SearchInput, Dropdown, Button, Input, DropdownAlt };