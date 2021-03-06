import React from 'react';
import './index.css';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const SwaggerAPI = props => <SwaggerUI url="/autoshop/api/json" />

export default SwaggerAPI;
