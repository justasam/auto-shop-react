import React,  { useState, useEffect} from 'react';
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import Popup from "reactjs-popup";
import {BranchCard} from '../../components/BranchCard'

import './index.css';

const Branches = props => {
  const [branches, setBranches] = useState([])
  const [loadingBranch, setLoadingBranch] = useState(true)
  const alert = useAlert();
  useEffect(() => {
    async function getBranches() {
        const response = await fetch(
            "/autoshop/api/branches",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        let data = await response.json();
        if(!response.ok){
          alert.error(JSON.stringify(data));
          return
        }

        setLoadingBranch(false);
        setBranches(data);
    }
    getBranches();
  }, {});

  console.log(branches)
  return (
    <div style={{height: "100%"}}>
      {(() => {
        if(loadingBranch) {
          return(
            <HashLoader
              sizeUnit={"px"}
              size={150}
              css={{height: "100%", margin: "0 auto"}}
              color={'#394263'} 
              loading={loadingBranch}
            />
          )
        } else {
          let data = branches.map(function (item, index){
            return(
                <li className="CompanyInfoCards__item">
                    <div className="CompanyInfoCards__container">
                        <div className="card__image card__image--fence"></div>
                        <div className="card__content">
                            <div className="card__title">{item.name}</div>
                            <p className="card__text">{item.address}</p>
                            <Popup 
                                trigger={<button className="btn btn--block card__btn">Details</button>} position="right center"
                                modal
                                closeOnDocumentClick
                            >
                                <div className="modal">
                                    <div className="header"><h3>Branch Details</h3></div>
                                    <BranchCard branch_id={item.id}/>
                                </div>
                            </Popup>
                        </div>
                    </div>
                </li>
            ) 
          })
            return(
              <div>
                <div id="map"></div>
                <ul className="CompanyInfoCards" style={{
                  display: "grid",
                  gridTemplateColumns: "auto"
                }}>
                 {data} 
                </ul>
              </div>
            )
        }
      })()}
    </div>
  )
}

export default Branches;
