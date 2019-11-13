import React, {useState} from 'react';
import { FormalizeVehiclePurchase } from '../../components/EmployeePanel/FormalizeVehiclePurchase';
import './index.css';



const EmployeePanel = () => {
    const [content, setContent] = useState("vehicle-purchases");
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 5fr"
        }}>
            <div className="sidePanel">
                <button onClick={(e) => {
                    e.preventDefault();
                    setContent("vehicle-purchase")
                }}>Formalise Vehicle Purchase</button>
            </div>
            <div>
                {(() => {
                    switch(content) {
                        case "vehicle-purchase":
                            return <FormalizeVehiclePurchase/>;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    )
}

export default EmployeePanel