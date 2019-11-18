import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import {BranchUpdateCard} from '../../BranchUpdateCard'
import {EmployeeCard} from '../../EmployeeCard'
import { useAlert } from "react-alert";
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


const BranchesTable = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);

  const setBranchData = (data) => {
    let deltaRows = rows.slice(0);
    deltaRows.forEach(function(r, i) {
      if(r.id == data.id) {
        deltaRows[i] = data;
      }
    })

    setRows(deltaRows);
  }

  const alert = useAlert();
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
                      <td>Address:</td><td>{row.address}</td>
                  </tr>
                  <tr>
                      <td>Manager ID:</td>
                      <td>
                          <Popup 
                              trigger={<span style={{
                                  cursor:"pointer",
                                  color:"blue",
                                  textDecoration: "underline"
                              }}>{row.manager_id}</span>} position="right center"
                              modal
                              closeOnDocumentClick
                          >
                              <div className="modal">
                                  <div className="header"><h3>Manager Details</h3></div>
                                  <EmployeeCard employee_id={row.manager_id}/>
                              </div>
                          </Popup>
                      </td>
                  </tr>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridColumnGap: "10px"
                    }}>
                      <button type="button" onClick={async () => {
                        const response = await fetch("/autoshop/api/branches/"+row.id, {
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
                            deltaRows.splice(i, 1);
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
                              <div className="header"><h3>Update Branch</h3></div>
                              <BranchUpdateCard branch={row} setBranchData={setBranchData}/>
                          </div>
                      </Popup>
                    </div>
              </table>
          </div>
      )
  };

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: "address", title: "Surname"},
    { name: "manager_id", title: "Manager ID"},
  ]);

  useEffect(() => {
        async function getBranches() {
            const branchesResp = await fetch(
                "/autoshop/api/branches", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            let resp = await branchesResp.json()
            if (!branchesResp.ok) {
              alert.error(JSON.stringify(resp))
              return
            }

            setRows(resp);
        }
        getBranches();
  }, []);

  return (
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
  );
};

export default BranchesTable; 