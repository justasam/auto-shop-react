import React from 'react';
import './index.css';

const DashboardCard = props => {
    return (
        <div class="DashboardCard">
            <aside class="sidenav">
                <div class="row row--align-v-center row--align-h-center">
                    <ul class="navList">
                        <li class="navList__heading">Customer <i class="fas fa-users"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center">
                                <span class="navList__subheading-icon"><i class="fas fa-briefcase-medical"></i></span>
                                <span class="navList__subheading-title">---</span>
                            </div>
                            <ul class="subList subList--hidden">
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                            </ul>
                        </li>
                        <li>
                            <div class="navList__subheading row row--align-v-center">
                                <span class="navList__subheading-icon"><i class="fas fa-plane-departure"></i></span>
                                <span class="navList__subheading-title">---</span>
                            </div>
                            <ul class="subList subList--hidden">
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                            </ul>
                        </li>
                        <li>
                            <div class="navList__subheading row row--align-v-center">
                                <span class="navList__subheading-icon"><i class="far fa-angry"></i></span>
                                <span class="navList__subheading-title">---</span>
                            </div>
                            <ul class="subList subList--hidden">
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                                <li class="subList__item">---</li>
                            </ul>
                        </li>

                        <li class="navList__heading">Employee <i class="fas fa-users"></i></li>
                        <li>
                            <div class="navList__subheading row row--align-v-center">
                                <span class="navList__subheading-icon"><i class="fas fa-envelope"></i></span>
                                <span class="navList__subheading-title">inbox</span>
                            </div>
                            <ul class="subList subList--hidden">
                                <li class="subList__item">primary</li>
                                <li class="subList__item">social</li>
                                <li class="subList__item">promotional</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>

            <main class="main">
                <div class="main-overview">
                    <div class="status">
                        <div class="status-icon status-icon--green">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="status-description">
                            <h3 class="status-title text-light">Customers</h3>
                            <p class="status-subtitle">999</p>
                        </div>
                    </div>
                    <div class="status">
                        <div class="status-icon status-icon--red">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="status-description">
                            <h3 class="status-title text-light">Employee</h3>
                            <p class="status-subtitle">999</p>
                        </div>
                    </div>
                    <div class="status">
                        <div class="status-icon status-icon--purple">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="status-description">
                            <h3 class="status-title text-light">TransactionS</h3>
                            <p class="status-subtitle">999</p>
                        </div>
                    </div>
                    <div class="status">
                        <div class="status-icon status-icon--green">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="status-description">
                            <h3 class="status-title text-light">Customers</h3>
                            <p class="status-subtitle">999</p>
                        </div>
                    </div>
                </div>
                <div class="main__cards">
                    <div class="card">
                        <div class="card__header">
                            <div class="card__header-title text-light">Events</div>
                            <div class="settings">
                                <div class="settings__block"><i class="fas fa-edit"></i></div>
                                <div class="settings__block"><i class="fas fa-cog"></i></div>
                            </div>
                        </div>
                        <div class="card__main">
                            <div class="card__row">
                                <div class="card__icon"><i class="fas fa-gift"></i></div>
                                <div class="card__time">
                                    <div>today</div>
                                </div>
                                <div class="card__detail">
                                    <div class="card__detail_title">Andy buy this car</div>
                                    <div class="card__description"> --- </div>
                                    <div class="card__note"> --- </div>
                                </div>
                            </div>
                            <div class="card__row">
                                <div class="card__icon"><i class="fas fa-users"></i></div>
                                <div class="card__time">
                                    <div>Tuesday</div>
                                </div>
                                <div class="card__detail">
                                    <div class="card__detail_title">Jhon add one product</div>
                                    <div class="card__description"> --- </div>
                                    <div class="card__note"> --- </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card__header">
                            <div class="card__header-title text-light">---</div>
                            <div class="settings">
                                <div class="settings__block"><i class="fas fa-edit"></i></div>
                                <div class="settings__block"><i class="fas fa-cog"></i></div>
                            </div>
                        </div>
                        <div class="card">

                        </div>
                    </div>
                    <div class="card">
                        <div class="card__header">
                            <div class="card__header-title text-light">---</div>
                            <div class="settings">
                                <div class="settings__block"><i class="fas fa-edit"></i></div>
                                <div class="settings__block"><i class="fas fa-cog"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardCard;
