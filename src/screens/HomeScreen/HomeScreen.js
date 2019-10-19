import React from 'react';
import { BlurryImage } from '../../components/BlurryImage';
import { SearchGroup } from '../../components/SearchGroup';
import './index.css';

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