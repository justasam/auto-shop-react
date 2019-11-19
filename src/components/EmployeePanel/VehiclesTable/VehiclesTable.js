import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import { Link, withRouter } from 'react-router-dom';
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import { ProductCardPopup } from "../../ProductCardPopup"
import { VehicleUpdateCard } from "../../VehicleUpdateCard"
import { 
  RowDetailState,
  FilteringState,
  IntegratedFiltering, 
  SearchState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  Toolbar,
  TableRowDetail,
  TableFilterRow,
  SearchPanel,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import './index.css';


const VehiclesTable = withRouter((props) => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);

  const alert = useAlert();
  const setVehicleData = (data) => {
    let deltaRows = rows.slice(0);
    deltaRows.forEach(function(r, i) {
      if(r.id == data.id) {
        deltaRows[i] = data;
      }
    })

    console.log(deltaRows)
    setRows(deltaRows);
  }

  const getRowId = row => row.id;
  const RowDetail = ({ row }) => {
      console.log(row)
      return (
          <div>
              <table class="inner-table" style={{width:"100%"}}>
                  <tr>
                    <td>ID:</td>
                    <td>
                        <Link to={{
                          hash: 'showcar'
                        }} style={{
                                cursor:"pointer",
                                color:"blue",
                                textDecoration: "underline"
                            }}>{row.id}</Link>
                        {props.location.hash ? <ProductCardPopup data={row} style={{
                          left: 'calc(50% + 120px)',
                        }} styleMain={{
                          zIndex: 600
                        }} /> : null}
                    </td>
                  </tr>
                  <tr>
                      <td>Make:</td><td>{row.make}</td>
                  </tr>
                  <tr>
                      <td>Model:</td><td>{row.model}</td>
                  </tr>
                  <tr>
                      <td>Year:</td><td>{row.year}</td>
                  </tr>
                  <tr>
                      <td>Price:</td><td>{row.price}</td>
                  </tr>
                  <tr>
                      <td>Mileage:</td><td>{row.milage}</td>
                  </tr>
                  <tr>
                      <td>Body Type:</td><td>{row.body_type}</td>
                  </tr>
                  <tr>
                      <td>Fuel Type:</td><td>{row.fuel_type}</td>
                  </tr>
                  <tr>
                      <td>Doors:</td><td>{row.doors}</td>
                  </tr>
                  <tr>
                      <td>Gearbox:</td><td>{row.gearbox}</td>
                  </tr>
                  <tr>
                      <td>Drivetrain:</td><td>{row.drivetrain}</td>
                  </tr>
                  <tr>
                      <td>Seats:</td><td>{row.seats}</td>
                  </tr>
                  <tr>
                      <td>Fuel Consumption:</td><td>{row.fuel_consumption}</td>
                  </tr>
                  <tr>
                      <td>Colour:</td><td>{row.colour}</td>
                  </tr>
                  <tr>
                      <td>engine:</td><td>{row.engine}</td>
                  </tr>
                  <tr>
                      <td>Description:</td><td>{row.description}</td>
                  </tr>
                  <tr>
                      <td>Specification:</td><td>{row.specification}</td>
                  </tr>
                  <tr>
                      <td>Listed:</td><td>{row.listed.toString()}</td>
                  </tr>
                  <tr>
                      <td>Sold:</td><td>{row.is_sold.toString()}</td>
                  </tr>
                  <tr>
                      <td>Created at:</td><td>{row.created_at}</td>
                  </tr>
                  <tr>
                    <td>
                    <Popup className="vehicle-update-popup"
                        trigger={<button type="button">UPDATE</button>} position="right center"
                        modal
                        closeOnDocumentClick
                    >
                        <div className="modal" style={{height: "100%"}}>
                            <div className="header"><h3>Update Vehicle</h3></div>
                            <VehicleUpdateCard vehicle={row} setVehicleData={setVehicleData}/>
                        </div>
                    </Popup>
                    </td>
                    { row.listed == true || row.listed == "true" ?
                      <button type="button" onClick={async () => {
                          const vehicleResp = await fetch(
                            "/autoshop/api/vehicles/" + row.id + "/delist", {
                                method: "POST",
                                headers: { 
                                    "Content-Type": "application/json"
                                }
                            }
                          )             

                          let resp = await vehicleResp.json()
                          if (!vehicleResp.ok) {
                              alert.error(JSON.stringify(resp))
                              return
                          }
          
                          alert.success("Success")
                          row.listed = "false"
                          setVehicleData(row);
                      }}>DELIST</button>
                      :
                      <button type="button" onClick={async () => {
                          const vehicleResp = await fetch(
                            "/autoshop/api/vehicles/" + row.id + "/list", {
                                method: "POST",
                                headers: { 
                                    "Content-Type": "application/json"
                                }
                            }
                          )             

                          let resp = await vehicleResp.json()
                          if (!vehicleResp.ok) {
                              alert.error(JSON.stringify(resp))
                              return
                          }
          
                          alert.success("Success")
                          row.listed = "true"
                          setVehicleData(row);
                      }}>LIST</button>
                    }
                  </tr>
              </table>
          </div>
      )
  };

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'make', title: 'Make' },
    { name: "model", title: "Model"},
    { name: "year", title: "Year"},
    { name: 'price', title: 'Price' },
    { name: 'listed', title: 'Is Listed' },
    { name: 'is_sold', title: 'Is Sold' },
    { name: 'created_at', title: 'Creatted At' },
  ]);

  const [loading, setLoading] = useState(true)
  useEffect(() => {
        async function getVehicles() {
          let payload = {per_page: 100000};
          const vehiclesResp = await fetch(
              "/autoshop/api/vehicles/query", {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: { 
                      "Content-Type": "application/json"
                  }
              }
          )             

          let resp = await vehiclesResp.json()

          if (!vehiclesResp.ok) {
              alert.error(JSON.stringify(resp))
              return
          }
          
          let vehicles = resp.objects.map((item) => {
            item.is_sold = item.is_sold.toString();
            item.listed = item.listed.toString();
            return item
          });

          setLoading(false);
          setRows(vehicles);
        }
        getVehicles();
  }, []);

  return (
    <div style={{height: "100%"}}>
    {
      loading ?
        <HashLoader
          sizeUnit={"px"}
          size={150}
          css={{height: "100%", margin: "0 auto"}}
          color={'#394263'} 
          loading={loading}
        />
      :
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SortingState/>
          <IntegratedSorting />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={5}
          />
          <IntegratedPaging />
          <SearchState />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
          />
          <VirtualTable height="100%"/>
          <TableHeaderRow showSortingControls/>
          <TableRowDetail
            contentComponent={RowDetail}
          />
          <TableFilterRow />
          <Toolbar />
          <SearchPanel />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
      </Paper>
    }
    </div>
  );
});

export default VehiclesTable; 