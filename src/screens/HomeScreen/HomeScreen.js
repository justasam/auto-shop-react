import React, {useState, useEffect} from 'react';
import { BlurryImage } from '../../components/BlurryImage';
import { SearchGroup } from '../../components/SearchGroup';
import { Carousel } from '../../components/Carousel';

import './index.css';

const HomeScreen = props => {

  const [bestSellingMakes, setBestSellingMakes] = useState([])
  const [recentlyListedVehicles, setRecentlyListedVehicles] = useState([])
  useEffect(() => {
    async function getTopSellers() {
        const response = await fetch(
          "/autoshop/api/vehicles/makes/best-selling?limit=10",
          {
            headers: {
              'Content-Type': 'application/json'
            }
          });

        let data = await response.json();
        data = data.map(function(val, index) {
            return {
              title: val.name,
              image: val.image_path,
              link: "",
              description: "",
            }
        })
        console.log(data)
        setBestSellingMakes(data);
    };

    async function getRecentlyListedVehicles() {
        const response = await fetch(
          "/autoshop/api/vehicles/query",
          { 
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"per_page": 10})
          }
        );

        let data = await response.json();
        setRecentlyListedVehicles(data);
    };

    getTopSellers();
    getRecentlyListedVehicles();
  }, []);


  return (
    <div>
      <BlurryImage src="https://www.tesla.com/ns_videos/commerce/content/dam/tesla/tesla-shop-marketing-imagery/hero-carousel/wall-connector.jpg">
        <SearchGroup />
      </BlurryImage>
      <Carousel data={bestSellingMakes} />
      {/* <Carousel recentlyListedVehicles/> */}
    </div>
  )
}

export default HomeScreen;