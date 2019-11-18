import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import { ProductCardPopup } from "../../ProductCardPopup"
import Popup from "reactjs-popup";
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


const CustomerEnquiries = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);
  const alert = useAlert();

  const [loading, setLoading] = useState(true)
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
                      <td>Type:</td><td>{row.type}</td>
                  </tr>
                  <tr>
                      <td>Resolved:</td><td>{row.resolved.toString()}</td>
                  </tr>
                  <tr>
                      <td>Created At:</td><td>{row.created_at}</td>
                  </tr>
                  <tr>
                      <td>Customer Name:</td><td>{row.customer_name}</td>
                  </tr>
                  <tr>
                      <td>Customer Surname:</td><td>{row.customer_surname}</td>
                  </tr>
                  <tr>
                      <td>Customer Email:</td><td>{row.customer_email}</td>
                  </tr>
                  {row.resolved &&  <tr><td>Resolved:</td><td>{row.resolved}</td></tr>}
                  {row.resolved_at &&  <tr><td>Resolved At:</td><td>{row.resolved_at}</td></tr>}
                  {row.employee_name && <tr><td>Employee Name:</td><td>{row.employee_name}</td></tr>}
                  {row.employee_surname && <tr><td>Employee Surname:</td><td>{row.employee_surname}</td></tr>}
                  {row.employee_email && <tr><td>Employee Name:</td><td>{row.employee_email}</td></tr>}
                  {row.vehicle_id ?
                    <div>
                      <tr>
                        <td>Vehicle ID:</td>
                        <td>
                          <Popup 
                              trigger={<span style={{
                                  cursor:"pointer",
                                  color:"blue",
                                  textDecoration: "underline"
                              }}>{row.vehicle_id}</span>} position="right center"
                              modal
                              closeOnDocumentClick
                          >
                              <div className="modal">
                                  <ProductCardPopup employee_id={row}/>
                              </div>
                          </Popup>
                        </td>
                      </tr>
                    </div>
                  : null}
                  {row.service_id && <tr><td>Employee ID:</td><td>{row.service_id}</td></tr>}
                  {row.description && <tr><td>Description:</td><td>{row.description}</td></tr>}
              </table>
          </div>
      )
  };
  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'type', title: 'Type' },
    { name: 'resolved', title: 'Resolved' },
    { name: 'resolved_at', title: 'Resolved At' },
    { name: 'created_at', title: 'Created At' },
    { name: 'description', title: 'Description'}
  ]);

  useEffect(() => {
        async function getEnquiries() {
            const accountResp = await fetch(
                "/autoshop/api/accounts/me", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            let account = await accountResp.json()
            if (!accountResp.ok) {
              alert.error(JSON.stringify(account));
              return
            }

            const response = await fetch(
                "/autoshop/api/customers/" + account.owner_id + "/enquiries",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            let data = await response.json();
            if(!response.ok) {
              alert.error(JSON.stringify(data));
              return
            }
            
            let enquiries = data.objects.map((item) => {
              item.resolved = item.resolved.toString();
              return item
            });

            console.log(enquiries);
            setLoading(false);
            setRows(enquiries);
        }
        getEnquiries();
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
};

export default CustomerEnquiries;