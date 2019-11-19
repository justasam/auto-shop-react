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
        let accountType = response.headers.get("X-Autoshop-Account-Type");
        data = data.objects.map((object) => ({...object, account_type: accountType}));
        setRecentlyListedVehicles(data);
    };

    getTopSellers();
    getRecentlyListedVehicles();
  }, []);

  return (
    <div>
      <BlurryImage src="https://www.tesla.com/ns_videos/commerce/content/dam/tesla/tesla-shop-marketing-imagery/hero-carousel/wall-connector.jpg">
        <p style={{
          textAlign: 'center',
          fontSize: '3.3vw',
          fontStyle: 'italic',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white'
        }}>Taking care of your former loved ones</p>
      </BlurryImage>
      {bestSellingMakes.length > 0 ? <Carousel height='300px' items={bestSellingMakes}/> : null}
      {recentlyListedVehicles.length > 0 ? <Carousel showPopup items={recentlyListedVehicles} title="RECENTLY LISTED VEHICLES"/> : null}
    </div>
  )
}

export default HomeScreen;
