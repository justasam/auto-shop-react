import React, {useState} from 'react';
import { FormalizeVehiclePurchase } from '../../components/EmployeePanel/FormalizeVehiclePurchase';
import { FormalizeVehicleSale } from '../../components/EmployeePanel/FormalizeVehicleSale';
import { CreateVehicleMake } from '../../components/EmployeePanel/CreateVehicleMake';
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
                <button onClick={(e) => {
                    e.preventDefault();
                    setContent("vehicle-sale")
                }}>Formalise Vehicle Sale</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setContent("create-vehicle-make")
                }}>Create Vehicle Make</button>
            </div>
            <div>
                {(() => {
                    switch(content) {
                        case "vehicle-purchase":
                            return <FormalizeVehiclePurchase/>;
                        case "vehicle-sale":
                            return <FormalizeVehicleSale/>;
                        case "create-vehicle-make":
                            return <CreateVehicleMake/>;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    )
}

export default EmployeePanel