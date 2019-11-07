import React from 'react';
import { GoogleMap } from '../../components/GoogleMap';
import { CompanyInfoCard } from '../../components/CompanyInfoCard';

import './index.css';

const Branches = props => {
  return (
    <div>
        <GoogleMap />
        <CompanyInfoCard />
    </div>
  )
}

export default Branches;
