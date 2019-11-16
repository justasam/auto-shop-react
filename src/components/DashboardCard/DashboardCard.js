import React, { useState, useEffect } from 'react';
import './index.css';

const DashboardCard = props => {
    const [branchesData, setBranchesData] = useState([]);
    const [customersData, setCustomersData] = useState([]);
    const [employeesData, setEmployeesData] = useState([]);
    const [enquiriesData, setEnquiriesData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);

    useEffect(async() => {
        const branchesRes = await fetch('/autoshop/api/branches', {
            method: 'GET',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            }
        });
        const customersRes = await fetch('/autoshop/api/customers?per_page=10&page=1', {
            method: 'GET',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            }
        });
        const employeesRes = await fetch('/autoshop/api/employees', {
            method: 'GET',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            }
        });
        const enquiriesRes = await fetch('/autoshop/api/enquiries?resolved=true&per_page=999&page_number=1', {
            method: 'GET',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            }
        });
        const vehiclesRes = await fetch('/autoshop/api/vehicles', {
            method: 'POST',
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Content-Type": 'application/json'
            }
        });
        /*
        let branchesData = await branchesRes.json();
        let customersData = await customersRes.json();
        let employeesData = await employeesRes.json();
        let enquiriesData = await enquiriesRes.json();
        let vehiclesData = await vehiclesRes.json();
        */

        // GET http://3.10.219.57/autoshop/api/branches
        let fakeBranchesData = [{
                "id": "43df1fe3-d482-4405-8809-9d735dee81ce",
                "name": "Dundee central",
                "address": "Dundee centre, DD1 1DD"
            },
            {
                "id": "711e9d28-61c7-4bed-85f2-9e755fd51604",
                "name": "Dundee central",
                "address": "Dundee centre, DD1 1DD"
            },
            {
                "id": "eedaac95-dac1-489d-a2a0-d6526431a62e",
                "name": "",
                "address": "not found"
            }
        ];

        // GET http://3.10.219.57/autoshop/api/customers?per_page=999&page=1
        let fakeCustomersData = {
            "objects": [{
                    "id": "2164288e-9639-4d27-9228-03a0b48f4b36",
                    "name": "Foo",
                    "surname": "Bar",
                    "last_seen_at": "2019-11-11T17:21:46Z",
                    "date_of_birth": "1990-10-10",
                    "address": "foo bar village",
                    "email": "foo@bar.com",
                    "phone_number": "1028319839123",
                    "account_id": "b3d30eea-6c78-4b04-b201-40d356e69f38"
                },
                {
                    "id": "2f88a10e-e102-4e68-8ec3-2c11820614fe",
                    "name": "Andrew",
                    "surname": "Navasaitis",
                    "last_seen_at": "2019-11-09T17:39:11Z",
                    "date_of_birth": "1990-10-10",
                    "address": "3111111111111114 Unicorn Court, West Victoria Dock Rd., DD1 3BH",
                    "email": "bar@bar.com",
                    "phone_number": "07597785318",
                    "account_id": "",
                    "is_deleted": true
                }
            ],
            "total": 2,
            "per_page": 999,
            "page_number": 1
        }

        // GET http://3.10.219.57/autoshop/api/employees?per_page=999&page_number=1
        let fakeEmployeesData = {
            "objects": [{
                    "id": "396592d0-af91-449e-8f31-e9192df3815c",
                    "name": "Andrius",
                    "surname": "Navasaitis",
                    "date_of_birth": "1998-02-18",
                    "address": "34 Unicorn Court, West Victoria Dock Road, Dudnee, DD1 3BH",
                    "position": "office_worker",
                    "email": "anavasaitis@gmail.com",
                    "phone_number": "0192318371",
                    "branch_id": "711e9d28-61c7-4bed-85f2-9e755fd51604",
                    "account_id": "137ef349-9c3b-49bc-a7b8-5cf069e60416"
                },
                {
                    "id": "a401f0b3-a6b1-4caf-802b-96c0255701e6",
                    "name": "Andrew",
                    "surname": "Navasaitis",
                    "date_of_birth": "1990-10-10",
                    "address": "34 Unicorn Court, West Victoria Dock Rd., DD1 3BH",
                    "position": "manager",
                    "email": "foo@bar.com",
                    "phone_number": "07597785318",
                    "branch_id": "eedaac95-dac1-489d-a2a0-d6526431a62e",
                    "is_deleted": true
                }
            ],
            "total": 2,
            "per_page": 999,
            "page_number": 1
        }

        // GET http://3.10.219.57/autoshop/api/enquiries?per_page=999&page_number=1
        let fakeEnquiriesData = {
            "objects": [{
                "id": "6f5d96f0-6e99-43de-ba5c-d9c3d0da3f76",
                "type": "vehicle-sale",
                "description": "I am interested in buying this vehicle",
                "resolved": true,
                "customer_id": "2164288e-9639-4d27-9228-03a0b48f4b36",
                "customer_name": "Foo",
                "customer_surname": "Bar",
                "customer_email": "foo@bar.com",
                "resolved_by": "396592d0-af91-449e-8f31-e9192df3815c",
                "employee_name": "Andrius",
                "employee_surname": "Navasaitis",
                "employee_email": "anavasaitis@gmail.com"
            }],
            "total": 1,
            "per_page": 999,
            "page_number": 1
        }

        // GET http://3.10.219.57/autoshop/api/enquiries?per_page=999&page_number=1
        let fakeVehiclesData = [{
                "id": "14adb3a9-c154-419a-a58c-f77e14e1aad0",
                "name": "volkswagen",
                "image_path": "./vehicle_make_pictures/volkswagen/base.png",
                "count": ""
            },
            {
                "id": "8ffe15e9-2ec6-40fe-b6b6-cdb6d38c2f21",
                "name": "renault",
                "image_path": "./vehicle_make_pictures/renault/base.png",
                "count": ""
            },
            {
                "id": "93ffd383-2613-4b09-9024-5f513a966ddf",
                "name": "ford",
                "image_path": "./vehicle_make_pictures/ford/base.png",
                "count": ""
            },
            {
                "id": "d2788cc5-dc1c-4c96-8841-92068aad4784",
                "name": "bmw",
                "image_path": "./vehicle_make_pictures/bmw/base.png",
                "count": ""
            },
            {
                "id": "f1cfcacb-4f23-4f8e-9e46-4a8dbc7a9297",
                "name": "mazda",
                "image_path": "./vehicle_make_pictures/mazda/base.png",
                "count": ""
            }
        ]

        let branchesData = fakeBranchesData;
        let customersData = fakeCustomersData;
        let employeesData = fakeEmployeesData;
        let enquiriesData = fakeEnquiriesData;
        let vehiclesData = fakeVehiclesData;

        setBranchesData(branchesData);
        setCustomersData(customersData);
        setEmployeesData(employeesData);
        setEnquiriesData(enquiriesData);
        setVehiclesData(vehiclesData);
    }, []);

    return (
<<<<<<< HEAD
=======
        <article className="DashboardCard">
            <aside className="sidenav">
                <div className="row row--align-v-center row--align-h-center">
                    <ul className="navList">
                        <li className="navList__heading">Customer <i className="fas fa-users"></i></li>
                        <li>
                            <div className="navList__subheading row row--align-v-center">
                                <span className="navList__subheading-icon"><i className="fas fa-briefcase-medical"></i></span>
                                <span className="navList__subheading-title">---</span>
                            </div>
                            <ul className="subList subList" data-tabs>
                                <li className="subList__item">
                                    <a href="#dashboard">Dashboard</a>
                                </li>
                                <li className="subList__item">
                                    <a href="#branches">branches</a>
                                </li>
                                <li className="subList__item">
                                    <a href="#customers">customers</a>
                                </li>
                                <li className="subList__item">
                                    <a href="#employees">employees</a>
                                </li>
                                <li className="subList__item">
                                    <a href="#enquiries">enquiries</a>
                                </li>
                                <li className="subList__item">
                                    <a href="#vehicles">vehicles</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="navList__subheading row row--align-v-center">
                                <span className="navList__subheading-icon"><i className="fas fa-plane-departure"></i></span>
                                <span className="navList__subheading-title">---</span>
                            </div>
                            <ul className="subList subList--hidden">
                                <li className="subList__item">---</li>
                                <li className="subList__item">---</li>
                                <li className="subList__item">---</li>
                            </ul>
                        </li>
                        <li>
                            <div className="navList__subheading row row--align-v-center">
                                <span className="navList__subheading-icon"><i className="far fa-angry"></i></span>
                                <span className="navList__subheading-title">---</span>
                            </div>
                            <ul className="subList subList--hidden">
                                <li className="subList__item">---</li>
                                <li className="subList__item">---</li>
                                <li className="subList__item">---</li>
                            </ul>
                        </li>

                        <li className="navList__heading">Employee <i className="fas fa-users"></i></li>
                        <li>
                            <div className="navList__subheading row row--align-v-center">
                                <span className="navList__subheading-icon"><i className="fas fa-envelope"></i></span>
                                <span className="navList__subheading-title">inbox</span>
                            </div>
                            <ul className="subList subList--hidden">
                                <li className="subList__item">primary</li>
                                <li className="subList__item">social</li>
                                <li className="subList__item">promotional</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
>>>>>>> Add tabs and table filter functions with vanilla js / Remove login form on LoginForm component

            <section className="main">
                <aside id="dashboard">
                    <ul className="main-overview">
                        <li className="status">
                            <div className="status-icon status-icon--green">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="status-description">
                                <h3 className="status-title text-light">Branches</h3>
                                <p className="status-subtitle">{branchesData.length}</p>
                            </div>
                        </li>
                        <li className="status">
                            <div className="status-icon status-icon--red">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="status-description">
                                <h3 className="status-title text-light">Customers</h3>
                                <p className="status-subtitle">{customersData.total}</p>
                            </div>
                        </li>
                        <li className="status">
                            <div className="status-icon status-icon--purple">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="status-description">
                                <h3 className="status-title text-light">Employees</h3>
                                <p className="status-subtitle">{employeesData.total}</p>
                            </div>
                        </li>
                        <li className="status">
                            <div className="status-icon status-icon--green">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="status-description">
                                <h3 className="status-title text-light">Enquiries</h3>
                                <p className="status-subtitle">{enquiriesData.total}</p>
                            </div>
                        </li>
                        <li className="status">
                            <div className="status-icon status-icon--green">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="status-description">
                                <h3 className="status-title text-light">Vehicles</h3>
                                <p className="status-subtitle">{vehiclesData.length}</p>
                            </div>
                        </li>
                    </ul>
                </aside>

                <aside id="branches">
                    <div className="main__cards">
                        <aside className="card">
                            <div className="card__header">
                                <div className="card__header-title text-light">Events</div>
                            </div>
                            <div className="card__main">
                                <div className="card__row">
                                    <div className="card__icon"><i className="fas fa-gift"></i></div>
                                    <div className="card__time">
                                        <div>today</div>
                                    </div>
                                    <div className="card__detail">
                                        <div className="card__detail_title">Andy buy this car</div>
                                        <div className="card__description"> --- </div>
                                        <div className="card__note"> --- </div>
                                    </div>
                                </div>
                                <div className="card__row">
                                    <div className="card__icon"><i className="fas fa-users"></i></div>
                                    <div className="card__time">
                                        <div>Tuesday</div>
                                    </div>
                                    <div className="card__detail">
                                        <div className="card__detail_title">Jhon add one product</div>
                                        <div className="card__description"> --- </div>
                                        <div className="card__note"> --- </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <aside className="card">
                            <div className="card__header">
                                <div className="card__header-title text-light">---</div>
                                <div className="settings">
                                    <div className="settings__block"><i class="fas fa-plus"></i></div>
                                </div>
                            </div>
                            <div className="card">
                                <input type="search" id="tableFilterInput" placeholder="Search for names.." title="Type in a name" />

                                <table id="tableFilterTable">
                                    <tr>
                                        <th>Name</th>
                                        <th>Country</th>
                                    </tr>
                                    <tr>
                                        <td>aaa</td>
                                        <td>surname</td>
                                        <th><button type="bottom"><i class="fas fa-user-edit"></i></button></th>
                                    </tr>
                                    <tr>
                                        <td>bbb</td>
                                        <td>surname</td>
                                        <th><button type="bottom"><i class="fas fa-user-edit"></i></button></th>
                                    </tr>
                                    {
                                        /*
                                        // not work !!!
                                        customersData.objects.map(customer => {
                                            const { name, surname } = customer;
                                            return (
                                                <tr>
                                                    <td>{name}</td>
                                                    <td>{surname}</td>
                                                    <th><button type="bottom"><i class="fas fa-user-edit"></i></button></th>
                                                </tr>
                                            )
                                        })
                                        */
                                    }
                                </table>
                            </div>
                        </aside>
                    </div>
<<<<<<< HEAD
                </div>
            </main>
=======
                </aside>

                <aside id="customers">

                </aside>
            </section>

            <aside className="popupForm">
                <button className="close"><i class="fas fa-times"></i></button>
                <form>
                    <div className="title">title</div>
                    <input />
                </form>
            </aside>
        </article>
>>>>>>> Add tabs and table filter functions with vanilla js / Remove login form on LoginForm component
    )
}

export default DashboardCard;
