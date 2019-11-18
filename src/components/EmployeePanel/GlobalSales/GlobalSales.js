import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Popup from "reactjs-popup";
import {CustomerCard} from '../../CustomerCard'
import {BranchCard} from '../../BranchCard'
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
                    <td>Sold For:</td><td>{row.sold_for}</td>
                </tr>
                <tr>
                    <td>Sold to Customer ID:</td>
                    <td>
                        <Popup 
                            trigger={<span style={{
                                cursor:"pointer",
                                color:"blue",
                                textDecoration: "underline"
                            }}>{row.sold_to_customer_id}</span>} position="right center"
                            modal
                            closeOnDocumentClick
                        >
                            <div className="modal">
                                <div className="header"><h3>Customer Details</h3></div>
                                <CustomerCard customer_id={row.sold_to_customer_id}/>
                            </div>
                        </Popup>
                    </td>
                </tr>
                <tr>
                    <td>Vehicle ID:</td><td>{row.vehicle_id}</td>
                </tr>
                <tr>
                    <td>Sold By Employee ID:</td>
                    <td>
                        <Popup 
                            trigger={<span style={{
                                cursor:"pointer",
                                color:"blue",
                                textDecoration: "underline"
                            }}>{row.sold_by_employee_id}</span>} position="right center"
                            modal
                            closeOnDocumentClick
                        >
                            <div className="modal">
                                <div className="header"><h3>Employee Details</h3></div>
                                <EmployeeCard employee_id={row.sold_by_employee_id}/>
                            </div>
                        </Popup>
                    </td>
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
                <tr>
                    <td>Customer Name:</td><td>{row.customer_name}</td>
                </tr>
                <tr>
                    <td>Customer Surname:</td><td>{row.customer_surname}</td>
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
                    <td>Created at:</td><td>{row.created_at}</td>
                </tr>
            </table>
        </div>
    )
};

const GlobalSales = () => {
    const [columns] = useState([
        { name: 'id', title: 'ID' },
        { name: 'vehicle_id', title: 'Vehicle ID' },
        { name: 'sold_for', title: 'Sold For' },
        { name: 'sold_to_customer_id', title: 'Sold To Customer ID' },
        { name: 'sold_by_employee_id', title: 'Sold By Employee ID' },
        { name: "customer_name", title: "Customer Name"},
        { name: "customer_surname", title: "Customer Surname"},
        { name: "branch_id", titel:"Employee Branch ID"},
        { name: "created_at", title:"Created at"}
    ]);

    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [rows, setRows] = useState([])
    const [pageSizes] = useState([5, 10, 15, 0]);
    const alert = useAlert();
    useEffect(() => {
        async function getGlobalSales() {
            const response = await fetch(
                "/autoshop/api/employees/sales",
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

            console.log(data)
            setRows(data);
        }
        getGlobalSales();
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

export default GlobalSales;