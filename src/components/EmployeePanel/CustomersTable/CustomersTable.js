import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import {CustomerUpdateCard} from '../../CustomerUpdateCard'
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
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


const CustomersTable = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);

  const alert = useAlert();
  const setCustomerData = (data) => {
    let deltaRows = rows.slice(0);
    deltaRows.forEach(function(r, i) {
      if(r.id == data.id) {
        deltaRows[i] = data;
      }
    })

    setRows(deltaRows);
  }

  const getRowId = row => row.id;
  const RowDetail = ({ row }) => {
      console.log(row)
      return (
          <div>
              <table class="inner-table" style={{width:"100%"}}>
                  <tr>
                      <td>ID:</td><td>{row.id}</td>
                  </tr>
                  <tr>
                      <td>Name:</td><td>{row.name}</td>
                  </tr>
                  <tr>
                      <td>Surname:</td><td>{row.surname}</td>
                  </tr>
                  <tr>
                      <td>Email:</td><td>{row.email}</td>
                  </tr>
                  <tr>
                      <td>Phone number:</td><td>{row.phone_number}</td>
                  </tr>
                  <tr>
                      <td>Address:</td><td>{row.address}</td>
                  </tr>
                  <tr>
                      <td>Account ID:</td><td>{row.account_id}</td>
                  </tr>
                  <tr>
                      <td>Is Deleted:</td><td>{row.is_deleted}</td>
                  </tr>
                  {row.is_deleted == "false" ||  !row.is_deleted ?
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridColumnGap: "10px"
                    }}>
                      <button type="button" onClick={async () => {
                        const response = await fetch("/autoshop/api/customers/"+row.id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        let resp = await response.json();
                        if (!response.ok) {
                          alert.error(JSON.stringify(resp));
                          return
                        }

                        let deltaRows = rows.slice(0);
                        console.log(deltaRows)
                        deltaRows.forEach(function(r, i) {
                          if (r.id == row.id) {
                            deltaRows[i].is_deleted = "true";
                          }
                        })

                        console.log(deltaRows)

                      setRows(deltaRows);
                      }}>Delete</button>
                      <Popup 
                          trigger={<button type="button">UPDATE</button>} position="right center"
                          modal
                          closeOnDocumentClick
                      >
                          <div className="modal">
                              <div className="header"><h3>Update Customer</h3></div>
                              <CustomerUpdateCard customer={row} setCustomerData={setCustomerData}/>
                          </div>
                      </Popup>
                    </div>
                  : null}
              </table>
          </div>
      )
  };

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: "surname", title: "Surname"},
    { name: "email", title: "Email"},
    { name: 'is_deleted', title: 'Is Deleted' },
  ]);

  const [loading, setLoading] = useState(true)
  useEffect(() => {
        async function getCustomers() {
            const customersResp = await fetch(
                "/autoshop/api/customers?per_page=1000", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            let resp = await customersResp.json()

            if (!customersResp.ok) {
              alert.error(JSON.stringify(resp));
              return
            }

            console.log(resp);
            let customers = resp.objects.map((item) => {
              item.is_deleted = item.is_deleted.toString();
              return item
            });
            setLoading(false);
            setRows(customers);
        }
        getCustomers();
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
      <Paper height="100%">
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
};

export default CustomersTable; 