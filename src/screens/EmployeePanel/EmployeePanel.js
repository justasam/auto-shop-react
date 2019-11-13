import React, {useState} from 'react';
import { FormalizeVehiclePurchase } from '../../components/EmployeePanel/FormalizeVehiclePurchase';
import './index.css';



const EmployeePanel = () => {
    const [content, setContent] = useState("vehicle-purchases");
    return (
        <div className="sidePanel">
            <button onClick={(e) => {
                e.preventDefault();
                setContent("vehicle-purchase")
            }}>Formalise Vehicle Purchase</button>
            {(() => {
                switch(content) {
                    case "vehicle-purchase":
                        return <FormalizeVehiclePurchase/>;
                    default:
                        return null;
                }
            })()}
        </div>
    )
}

export default EmployeePanel