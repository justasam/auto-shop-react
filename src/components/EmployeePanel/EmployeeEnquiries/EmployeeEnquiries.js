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
                    <td>Type:</td><td>{row.type}</td>
                </tr>
                <tr>
                    <td>Resolved:</td><td>{row.resolved.toString()}</td>
                </tr>
                <tr>
                    <td>Created At:</td><td>{row.created_at}</td>
                </tr>
                <tr>
                    <td>Customer ID:</td><td>{row.customer_id}</td>
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
                {row.resolved_by && <tr><td>Resolved By:</td><td>{row.resolved_by}</td></tr>}
                {row.resolved_at && <tr><td>Resolved At:</td><td>{row.resolved_at}</td></tr>}
                {row.employee_name && <tr><td>Employee Name:</td><td>{row.employee_name}</td></tr>}
                {row.employee_surname && <tr><td>Employee Surname:</td><td>{row.employee_surname}</td></tr>}
                {row.employee_email && <tr><td>Employee Name:</td><td>{row.employee_email}</td></tr>}
                {row.vehicle_id && <tr><td>Vehicle ID:</td><td>{row.vehicle_id}</td></tr>}
                {row.service_id && <tr><td>Employee ID:</td><td>{row.service_id}</td></tr>}
                {row.description && <tr><td>Description:</td><td>{row.description}</td></tr>}
            </table>
        </div>
    )
};

const EmployeeEnquiries = () => {
  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'type', title: 'Type' },
    { name: 'created_at', title: 'Created At' },
    { name: 'resolved', title: 'Resolved' },
    { name: 'resolved_at', title: 'Resolved At' },
  ]);

  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [rows, setRows] = useState([])
  const [pageSizes] = useState([5, 10, 15, 0]);
  // const [sortingStateColumnExtensions] = useState([
  //   { columnName: 'gender', sortingEnabled: false },
  // ]);

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