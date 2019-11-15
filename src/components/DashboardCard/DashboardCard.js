import React from 'react';
import './index.css';

const DashboardCard = props => {
    return (

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
    )
}

export default DashboardCard;
