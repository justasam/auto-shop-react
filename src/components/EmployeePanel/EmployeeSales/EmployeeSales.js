
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
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
                    <td>Sold to Customer ID:</td><td>{row.sold_to_customer_id}</td>
                </tr>
                <tr>
                    <td>Vehicle ID:</td><td>{row.vehicle_id}</td>
                </tr>
                <tr>
                    <td>Sold By Employee ID:</td><td>{row.sold_by_employee_id}</td>
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
            </table>
        </div>
    )
};

const EmployeeSales = () => {
    const [columns] = useState([
        { name: 'id', title: 'ID' },
        { name: 'sold_for', title: 'Sold For' },
        { name: 'sold_to_customer_id', title: 'Sold To Customer ID' },
        { name: 'vehicle_id', title: 'Vehicle ID' },
    ]);

    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [rows, setRows] = useState([])
    const [pageSizes] = useState([5, 10, 15, 0]);

    useEffect(() => {
        async function getEmployeeSales() {
            const accountResp = await fetch(
                "/autoshop/api/auth/user", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json"
                    }
                }
            )             

            if (accountResp.status !== 200) {
                return
            }

            let account = await accountResp.json()
            console.log(account)

            account = account.employee
            const response = await fetch(
                "/autoshop/api/employees/" + account.id + "/sales",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            let data = await response.json();
            console.log(data)
            setRows(data);
        }
        getEmployeeSales();
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

export default EmployeeSales;