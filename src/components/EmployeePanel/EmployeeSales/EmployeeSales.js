
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { 
  RowDetailState,
  FilteringState,
  IntegratedFiltering, 
  SearchState,
  PagingState,
  IntegratedPaging,
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
                    <td>Sold By Employee ID:</td><td>{row.sold_employee_id}</td>
                </tr>
                <tr>
                    <td>Customer Surname:</td><td>{row.customer_surname}</td>
                </tr>
                <tr>
                    <td>Customer Email:</td><td>{row.customer_email}</td>
                </tr>
                {row.resolved_by && <tr><td>Resolved By:</td><td>{row.resolved_by}</td></tr>}
                {row.employee_name && <tr><td>Employee Name: {row.employee_name}</td></tr>}
                {row.employee_surname && <tr><td>Employee Surname: {row.employee_surname}</td></tr>}
                {row.employee_email && <tr><td>Employee Name: {row.employee_email}</td></tr>}
                {row.vehicle_id && <tr><td>Vehicle ID: {row.vehicle_id}</td></tr>}
                {row.service_id && <tr><td>Employee ID: {row.service_id}</td></tr>}
                {row.description && <tr><td>Description: {row.description}</td></tr>}
            </table>
        </div>
    )
};

const EmployeeEnquiries = () => {
    const [columns] = useState([
        { name: 'id', title: 'ID' },
        { name: 'type', title: 'Type' },
        { name: 'resolved', title: 'Resolved' },
        { name: 'resolved_by', title: 'Resolved By' },
        { name: 'description', title: 'Description' },
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
        <TableHeaderRow/>
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