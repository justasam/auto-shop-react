import React from 'react';
import './index.css';

const CompanyInfoCard = props => {
    let fackData = [];

    for (var i = 0; i < 10; i++) {
        fackData.push(
            <li className="CompanyInfoCards__item">
                <div className="card">
                    <div className="card__image card__image--fence"></div>
                    <div className="card__content">
                        <div className="card__title">Company</div>
                        <p className="card__text">info</p>
                        <button className="btn btn--block card__btn">detail</button>
                    </div>
                </div>
            </li>
        )
    }
    return (
        <div>
            <ul className="CompanyInfoCards">
                {fackData}
            </ul>
        </div>
    )
}

export default CompanyInfoCard;
