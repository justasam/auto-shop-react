import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import {BranchCard} from '../../BranchCard'
import {EmployeeUpdateCard} from '../../EmployeeUpdateCard'
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


const EmployeesTable = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);

  const alert = useAlert();
  const setEmployeeData = (data) => {
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
                      <td>ID:</td><td>{row.id}</td>
                  </tr>
                  <tr>
                      <td>Name:</td><td>{row.name}</td>
                  </tr>
                  <tr>
                      <td>Surname:</td><td>{row.surname}</td>
                  </tr>
                  <tr>
                      <td>Position:</td><td>{row.position}</td>
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
                      <td>Branch ID:</td>
                      <td>
                          <Popup 
                              trigger={<span style={{
                                  cursor:"pointer",
                                  color:"blue",
                                  textDecoration: "underline"
                              }}>{row.branch_id}</span>} position="right center"
                              modal
                              closeOnDocumentClick
                          >
                              <div className="modal">
                                  <div className="header"><h3>Branch Details</h3></div>
                                  <BranchCard branch_id={row.branch_id}/>
                              </div>
                          </Popup>
                      </td>
                  </tr>
                  {row.is_deleted == "false" ||  !row.is_deleted ?
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridColumnGap: "10px"
                    }}>
                      <button type="button" onClick={async () => {
                        const response = await fetch("/autoshop/api/employees/"+row.id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        console.log(response);
                        let resp = await response.json();
                        console.log(resp);

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
                              <div className="header"><h3>Update Employee</h3></div>
                              <EmployeeUpdateCard employee={row} setEmployeeData={setEmployeeData}/>
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
    { name: "position", title: "Position"},
    { name: 'branch_id', title: 'Branch ID' },
    { name: 'is_deleted', title: 'Is Deleted' },
  ]);

  const [loading, setLoading] = useState(true)
  useEffect(() => {
        async function getEmployees() {
            const employeesResp = await fetch(
                "/autoshop/api/employees?per_page=1000", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            let resp = await employeesResp.json()

            if (!employeesResp.ok) {
                alert.error(JSON.stringify(resp))
                return
            }

            let employees = resp.objects.map((item) => {
              item.is_deleted = item.is_deleted.toString();
              return item
            });
            setLoading(false);
            setRows(employees);
        }
        getEmployees();
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

export default EmployeesTable; 