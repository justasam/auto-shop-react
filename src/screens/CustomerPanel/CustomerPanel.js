import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { CustomerEnquiries } from '../../components/CustomerPanel/CustomerEnquiries';
import { CustomerPurchases } from '../../components/CustomerPanel/CustomerPurchases';
import { CustomerSales } from '../../components/CustomerPanel/CustomerSales';
import { CustomerUpdateForm } from '../../components/CustomerPanel/CustomerUpdateForm';
import { PasswordUpdateForm } from '../../components/PasswordUpdateForm';
import { useAlert } from "react-alert";
import './index.css';



const CustomerPanel = () => {
    const [content, setContent] = useState("your-details");
    const [accountType, setAccountType] = useState();
    const [account, setAccount] = useState();
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
                return
            }

            let accType = response.headers.get("X-Autoshop-Account-Type");
            setAccountType(accType)
            setAccount(resp)
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
                        <li class="navList__heading">Your Sales And Purchases<i class="fas fa-wallet"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                console.log("clicked")
                                e.preventDefault();
                                setContent("customer-purchases");
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                <span class="navList__subheading-title">Your Purchases</span>
                            </div>
                        </li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("customer-sales")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-money-bill-alt"></i></span>
                                <span class="navList__subheading-title">Your Sales</span>
                            </div>
                        </li>
                        <li class="navList__heading">Your Enquiries<i class="fas fa-envelope"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center" onClick={(e) => {
                                e.preventDefault();
                                setContent("list-enquiries")
                            }}>
                                <span class="navList__subheading-icon"><i class="fas fa-list"></i></span>
                                <span class="navList__subheading-title">Enquiry List</span>
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
                    console.log(account)
                    switch(content) {
                        case "your-details":
                            return <CustomerUpdateForm customer_id={account.owner_id}/>;
                        case "change-password":
                            return <PasswordUpdateForm account_id={account.id} old_password={account.password}/>;
                        case "list-enquiries":
                            return <CustomerEnquiries/>;
                        case "customer-purchases":
                            return <CustomerPurchases/>;
                        case "customer-sales":
                            return <CustomerSales/>;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}

export default CustomerPanel