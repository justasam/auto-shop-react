import React, {useState} from 'react';
import { VehiclePurchaseFormalizationForm } from '../../components/VehiclePurchaseFormalizationForm';
import { VehicleSaleFormalizationForm } from '../../components/VehicleSaleFormalizationForm';
import { CreateVehicleMake } from '../../components/EmployeePanel/CreateVehicleMake';
import { EmployeeSales } from '../../components/EmployeePanel/EmployeeSales';
import { EmployeePurchases } from '../../components/EmployeePanel/EmployeePurchases';
import { EmployeeEnquiries } from '../../components/EmployeePanel/EmployeeEnquiries';
import './index.css';



const EmployeePanel = () => {
    const [content, setContent] = useState("vehicle-purchases");
    return (
        <div class="DashboardCard">
            <aside class="sidenav">
                <div class="row row--align-v-center row--align-h-center">
                    <ul class="navList">
                        <li class="navList__heading">Your Sales And Purchases<i class="fas fa-wallet"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                console.log("clicked")
                                e.preventDefault();
                                setContent("employee-purchases");
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                <span class="navList__subheading-title">Your Purchases</span>
                            </div>
                        </li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("employee-sales")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                <span class="navList__subheading-title">Your Sales</span>
                            </div>
                        </li>
                        <li class="navList__heading">Vehicle Operations<i class="fas fa-car-side"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("vehicle-purchase")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-car"></i></span>
                                <span class="navList__subheading-title">Formalise Vehicle Purchase</span>
                            </div>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("vehicle-sale")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-car"></i></span>
                                <span class="navList__subheading-title">Formalise Vehicle Sale</span>
                            </div>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("create-vehicle-make")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-car"></i></span>
                                <span class="navList__subheading-title">Create Vehicle Make</span>
                            </div>
                        </li>
                        <li class="navList__heading">Enquiries<i class="fas fa-envelope"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("list-enquiries")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                <span class="navList__subheading-title">Enquiry List</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            <div>
                {(() => {
                    switch(content) {
                        case "vehicle-purchase":
                            return <VehiclePurchaseFormalizationForm/>;
                        case "vehicle-sale":
                            return <VehicleSaleFormalizationForm/>;
                        case "create-vehicle-make":
                            return <CreateVehicleMake/>;
                        case "employee-sales":
                            return <EmployeeSales/>;
                        case "employee-purchases":
                            return <EmployeePurchases/>;
                        case "list-enquiries":
                            return <EmployeeEnquiries/>;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}

export default EmployeePanel