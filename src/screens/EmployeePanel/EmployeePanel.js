import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { VehiclePurchaseFormalizationForm } from '../../components/VehiclePurchaseFormalizationForm';
import { VehicleSaleFormalizationForm } from '../../components/VehicleSaleFormalizationForm';
import { VehicleMakeCreationForm } from '../../components/VehicleMakeCreationForm';
import { EmployeeCreationForm } from '../../components/EmployeeCreationForm';
import { EmployeesTable } from '../../components/EmployeePanel/EmployeesTable';
import { BranchesTable } from '../../components/EmployeePanel/BranchesTable';
import { BranchCreationForm } from '../../components/BranchCreationForm';
import { CustomersTable } from '../../components/EmployeePanel/CustomersTable';
import { EmployeeSales } from '../../components/EmployeePanel/EmployeeSales';
import { EmployeePurchases } from '../../components/EmployeePanel/EmployeePurchases';
import { EmployeeEnquiries } from '../../components/EmployeePanel/EmployeeEnquiries';
import { VehiclesTable } from '../../components/EmployeePanel/VehiclesTable';
import { GlobalSales } from '../../components/EmployeePanel/GlobalSales';
import { GlobalPurchases } from '../../components/EmployeePanel/GlobalPurchases';
import { PasswordUpdateForm } from '../../components/PasswordUpdateForm';
import { EmployeeUpdateForm } from '../../components/EmployeePanel/EmployeeUpdateForm';
import { useAlert } from "react-alert";
import './index.css';


const EmployeePanel = () => {
    const [content, setContent] = useState("global-sales");
    const [accountType, setAccountType] = useState();
    const [account, setAccount] = useState()
    const alert = useAlert();
    useEffect(() => {
        async function GetUser() {
            const response = await fetch("/autoshop/api/accounts/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const resp = await response.json();
            if (response.status == 404) {
                setAccountType("guest");
            }

            if (response.status >= 500) {
                setAccountType("guest");
                alert.error(JSON.stringify(resp));
                return
            }

            setAccount(resp)

            let accType = response.headers.get("X-Autoshop-Account-Type");
            if (accType == "guest") {
                return (<Redirect to="/Home"/>)
            }
            setAccountType(accType);
        }
        GetUser();

    },[]);

    if(!accountType || !account) {
        return null
    }

    if (accountType && accountType == "guest") {
        return <Redirect to="/Home"/>
    }

    console.log(accountType)

    return (
        <div class="DashboardCard">
            <aside class="sidenav">
                <div class="row row--align-v-center row--align-h-center">
                    <ul class="navList">
                            <li class="navList__heading">Your details<i class="fas fa-sliders-h"></i></li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("your-details");
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-info"></i></span>
                                    <span class="navList__subheading-title">Personal Information</span>
                                </div>
                            </li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("change-password")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-edit"></i></span>
                                    <span class="navList__subheading-title">Change Password</span>
                                </div>
                            </li>
                            {accountType == "admin" ?
                            <div>
                            <li class="navList__heading">Gobal Sales And Purchases<i class="fas fa-globe"></i></li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    console.log("clicked")
                                    e.preventDefault();
                                    setContent("global-purchases");
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                    <span class="navList__subheading-title">Global Purchases</span>
                                </div>
                            </li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("global-sales")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                    <span class="navList__subheading-title">Global Sales</span>
                                </div>
                            </li>
                        </div>
                        : null}
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
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("vehicles-list")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                <span class="navList__subheading-title">Vehicle List</span>
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
                        {accountType == "admin" ?
                        <div>
                            <li class="navList__heading">Employees<i class="fas fa-social"></i></li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("employee-creation")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-plus-square"></i></span>
                                    <span class="navList__subheading-title">Create Employee</span>
                                </div>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("employees-table")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                    <span class="navList__subheading-title">Employees List</span>
                                </div>
                            </li>
                        </div>
                        : null}
                        {accountType == "admin" ?
                        <div>
                            <li class="navList__heading">Branches<i class="fas fa-code-branch"></i></li>
                            <li>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("branch-creation")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-plus-square"></i></span>
                                    <span class="navList__subheading-title">Create Branch</span>
                                </div>
                                <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                    e.preventDefault();
                                    setContent("branches-table")
                                }}>
                                    <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                    <span class="navList__subheading-title">Branches List</span>
                                </div>
                            </li>
                        </div>
                        : null}
                        <li class="navList__heading">Customers<i class="fas fa-social"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("customers-table")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                <span class="navList__subheading-title">Customers List</span>
                            </div>
                        </li>
                        <li onClick={async ()=> {
                            const response = await fetch("/autoshop/api/auth/logout", {
                                method: "POST",
                                body: JSON.stringify({}),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });

                            if (!response.ok) {
                                alert.error(JSON.stringify(response.statusText));
                                return
                            }

                            alert.success("Success");
                            window.location.reload(); 
                        }} className="navbar_link" style={{float: 'left', cursor: 'pointer'}}>LOG OUT</li>
                    </ul>
                </div>
            </aside>
            <div>
                {(() => {
                    switch(content) {
                        case "your-details":
                            return <EmployeeUpdateForm employee_id={account.owner_id}/>;
                        case "change-password":
                            return <PasswordUpdateForm account_id={account.id} old_password={account.password}/>;
                        case "vehicle-purchase":
                            return <VehiclePurchaseFormalizationForm/>;
                        case "vehicle-sale":
                            return <VehicleSaleFormalizationForm/>;
                        case "create-vehicle-make":
                            return <VehicleMakeCreationForm/>;
                        case "employee-sales":
                            return <EmployeeSales/>;
                        case "employee-purchases":
                            return <EmployeePurchases/>;
                        case "list-enquiries":
                            return <EmployeeEnquiries/>;
                        case "employee-creation":
                            return <EmployeeCreationForm/>;
                        case "employees-table":
                            return <EmployeesTable/>;
                        case "customers-table":
                            return <CustomersTable/>;
                        case "branch-creation":
                            return <BranchCreationForm/>;
                        case "branches-table":
                            return <BranchesTable/>;
                        case "global-sales":
                            return <GlobalSales/>;
                        case "global-purchases":
                            return <GlobalPurchases/>;
                        case "vehicles-list":
                            return <VehiclesTable/>;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}

export default EmployeePanel