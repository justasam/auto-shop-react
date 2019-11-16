import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import {CustomerCard} from '../../CustomerCard'
import {EmployeeCard} from '../../EmployeeCard'
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


const EmployeeEnquiries = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);

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
                      <td>Customer ID:</td>
                      <td>
                          <Popup 
                              trigger={<span style={{
                                  cursor:"pointer",
                                  color:"blue",
                                  textDecoration: "underline"
                              }}>{row.customer_id}</span>} position="right center"
                              modal
                              closeOnDocumentClick
                          >
                              <div className="modal">
                                  <div className="header"><h3>Customer Details</h3></div>
                                  <CustomerCard customer_id={row.customer_id}/>
                              </div>
                          </Popup>
                      </td>
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
                  {row.resolved_by ?
                      <tr><td>Resolved By:</td>
                      <td>
                          <Popup 
                              trigger={<span style={{
                                  cursor:"pointer",
                                  color:"blue",
                                  textDecoration: "underline"
                              }}>{row.resolved_by}</span>} position="right center"
                              modal
                              closeOnDocumentClick
                          >
                              <div className="modal">
                                  <div className="header"><h3>Employee Details</h3></div>
                                  <EmployeeCard employee_id={row.resolved_by}/>
                              </div>
                          </Popup>
                      </td>
                      </tr>
                    : null}
                  {row.resolved_at &&  <tr><td>Resolved At:</td><td>{row.resolved_at}</td></tr>}
                  {row.employee_name && <tr><td>Employee Name:</td><td>{row.employee_name}</td></tr>}
                  {row.employee_surname && <tr><td>Employee Surname:</td><td>{row.employee_surname}</td></tr>}
                  {row.employee_email && <tr><td>Employee Name:</td><td>{row.employee_email}</td></tr>}
                  {row.vehicle_id && <tr><td>Vehicle ID:</td><td>{row.vehicle_id}</td></tr>}
                  {row.service_id && <tr><td>Employee ID:</td><td>{row.service_id}</td></tr>}
                  {row.description && <tr><td>Description:</td><td>{row.description}</td></tr>}
                  {row.resolved == "false" ?
                    <button type="button" onClick={async () => {
                      const response = await fetch("/autoshop/api/enquiries/"+row.id+ "/resolved", {
                          method: "POST",
                          body: JSON.stringify({}),
                          headers: {
                              "Content-Type": "application/json"
                          }
                      });

                      if (!response.ok) {
                        alert(response.statusText);
                        return
                      }

                      const resp = await response.json();

                      let deltaRows = rows
                      console.log(deltaRows)
                      deltaRows.forEach(function(r, i) {
                        if (r.id == row.id) {
                          rows[i].resolved_by = resp.resolved_by;
                          rows[i].resolved = resp.resolved.toString();
                          rows[i].resolved_at = resp.resolved_at;
                        }
                      })

                      console.log(deltaRows)

                    setRows(deltaRows);
                    }}>Mark Resolved</button>
                  : null}
              </table>
          </div>
      )
  };
  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'type', title: 'Type' },
    { name: "customer_name", title: "Customer Name"},
    { name: "customer_surname", title: "Customer Surname"},
    { name: 'resolved', title: 'Resolved' },
    { name: 'resolved_at', title: 'Resolved At' },
    { name: 'created_at', title: 'Created At' },
  ]);

  useEffect(() => {
        async function getEnquiries() {
            const enquiriesResp = await fetch(
                "/autoshop/api/enquiries?per_page=1000", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            if (enquiriesResp.status !== 200) {
                return
            }

            let enquiries = await enquiriesResp.json()
            enquiries = enquiries.objects.map((item) => {
              item.resolved = item.resolved.toString();
              return item
            });

            setRows(enquiries);
        }
        getEnquiries();
  }, []);

  return (
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
        <VirtualTable />
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
  );
};

export default EmployeeEnquiries;