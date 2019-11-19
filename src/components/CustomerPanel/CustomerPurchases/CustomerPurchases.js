import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import HashLoader from 'react-spinners/HashLoader'
import {useAlert} from "react-alert";
import { Link, withRouter } from 'react-router-dom';
import { ProductCardPopup } from "../../ProductCardPopup"
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


const CustomerPurchases = withRouter((props) => {
  const [columns] = useState([
      { name: 'vehicle_make', title: 'Vehicle Make' },
      { name: 'vehicle_model', title: 'Vehicle Model' },
      { name: 'sold_for', title: 'Purchased For' },
      { name: "employee_name", title: "Employee Name"},
      { name: "employee_surname", title: "Employee Surname"},
  ]);

  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);
  const alert = useAlert();
  const [vehicle, setVehicle] = useState()
  const [loading, setLoading] = useState(false)
  const getRowId = row => row.id;

  const RowDetail = ({ row }) => {
    async function getVehicle() {
      setLoading(true);
      const vehicleResp = await fetch(
        "/autoshop/api/vehicles/" + row.vehicle_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      )

      let vehicle = await vehicleResp.json()
      if (!vehicleResp.ok) {
        alert.error(vehicle);
        return
      }

      let accountType = vehicleResp.headers.get("X-Autoshop-Account-Type");
      vehicle.account_type = accountType;
      setLoading(false);
      setVehicle(vehicle)
    }
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
        <table class="inner-table" style={{width:"100%"}}>
            <tr>
                <td>ID:</td><td>{row.id}</td>
            </tr>
            <tr>
                <td>Purchased For:</td><td>{row.sold_for}</td>
            </tr>
            <tr>
                <td>Vehicle ID:</td><td>{row.vehicle_id}</td>
            </tr>
            <tr>
              <td>Vehicle ID:</td>
              <td>
                <Link to={{
                  hash: 'showcar'
                }} onClick={
                  async (e) => {
                    e.preventDefault();

                    if (!vehicle || vehicle.id !== row.vehicle_id) await getVehicle();

                    props.history.push({
                      hash: 'showcar'
                    });
                  }
                } style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline"
                }}>{row.vehicle_id}</Link>
                {props.location.hash && vehicle && vehicle.id === row.vehicle_id ? <ProductCardPopup data={vehicle} style={{
                  left: 'calc(50% + 120px)',
                }} styleMain={{
                  zIndex: 600
                }} /> : null}
              </td>
            </tr>
            <tr>
                <td>Vehicle Make:</td><td>{row.vehicle_make}</td>
            </tr>
            <tr>
                <td>Vehicle Model:</td><td>{row.vehicle_model}</td>
            </tr>
            <tr>
                <td>Vehicle Year:</td><td>{row.vehicle_year}</td>
            </tr>
            <tr>
                <td>Employee Name:</td><td>{row.employee_name}</td>
            </tr>
            <tr>
                <td>Employee Surname:</td><td>{row.employee_surname}</td>
            </tr>
        </table>
      }
    </div>
    )
  };

  useEffect(() => {
      async function getCustomerPurchases() {
          const userResp = await fetch(
              "/autoshop/api/auth/user", {
                  method: "GET",
                  headers: { 
                      "Content-Type": "application/json"
                  }
              }
          )             

          let user = await userResp.json()
          if (!userResp.ok) {
              alert.error(user);
              return
          }

          console.log(user)

          let customer = user.customer
          const response = await fetch(
              "/autoshop/api/customers/" + customer.id + "/purchases",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          if(!response.ok) {
              alert.error(data);
              return
          }

          console.log(data)
          setLoading(false);
          setRows(data);
      }
      getCustomerPurchases();
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
            // loading={loading}
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

export default CustomerPurchases;