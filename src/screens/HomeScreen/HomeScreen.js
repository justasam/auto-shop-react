import React, {useState} from 'react';
import { BlurryImage } from '../../components/BlurryImage';
import { SearchInput, Dropdown, Button } from '../../components/Inputs';
import './index.css';
import { ChevronDown } from 'react-feather';

const SearchGroup = props => {
  const [ active, setActive ] = useState(false);

  return (
    <div className="search_group">
      <p className="biggertext title textshadow">SEARCH OUR SHOP</p>
      <SearchInput />
      <div className="adv_toggle" onClick={() => setActive(!active)}>
        <span>Advanced</span>
        <ChevronDown size={25} color="white" className={`adv_toggle_icon ${active ? 'active' : null}`}/>
      </div>
      <div className={`dropdown_group ${active ? 'active' : null}`}>
        <Dropdown options={[
          {name: 'Make (any)', value: 'any'},
          {name: 'Volvo', value: 'volvo'},
          {name: 'Tesla', value: 'tesla'},
          {name: 'Audi', value: 'audi'},
        ]} />
        <Dropdown options={[
          {name: 'Model (any)', value: 'any'},
          {name: 'Volvo', value: 'volvo'},
          {name: 'Tesla', value: 'tesla'},
          {name: 'Audi', value: 'audi'},
        ]} />
        <Dropdown options={[
          {name: 'Min price', value: 'any'},
          {name: 'Volvo', value: 'volvo'},
          {name: 'Tesla', value: 'tesla'},
          {name: 'Audi', value: 'audi'},
        ]} />
        <Dropdown options={[
          {name: 'Max price', value: 'any'},
          {name: 'Volvo', value: 'volvo'},
          {name: 'Tesla', value: 'tesla'},
          {name: 'Audi', value: 'audi'},
        ]} />
      </div>
      <Button name='SEARCH 421,124 CARS' className="transformcenter" onClick={() => console.log('submit')} />
    </div>
  )
}

const HomeScreen = props => {
  return (
    <div>
      <BlurryImage src="https://www.tesla.com/ns_videos/commerce/content/dam/tesla/tesla-shop-marketing-imagery/hero-carousel/wall-connector.jpg">
        <SearchGroup />
      </BlurryImage>
      <h3>HomeScreen View</h3>
      
      
    </div>
  )
}

export default HomeScreen;