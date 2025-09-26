import DataTable from "react-data-table-component";
import Search from "./Search";
import Filters from "./Filters";
import React, { useState } from "react";

const Spreadsheet = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const columns = [
    { name: "Division", selector: (row) => row.Division, sortable: true },
    { name: "Team", selector: (row) => row.Team, sortable: true },
    { name: "FirstName", selector: (row) => row.FirstName, sortable: true },
    { name: "LastName", selector: (row) => row.LastName, sortable: true },
    { name: "Email", selector: (row) => row.Email, sortable: true },
    {
      name: "DateLastSent",
      selector: (row) => row.DateLastSent,
      sortable: true,
    },
    {
      name: "PlayerLastSent",
      selector: (row) => row.PlayerLastSent,
      sortable: true,
    },
  ];

  const flatData = data.flat();

  return (
    <div className=" ">
      <div className="flex justify-end">
        <Search />
        <Filters />
      </div>
      <div className="border rounded-md max-h-[70vh] w-full overflow-auto">
        <DataTable
          columns={columns}
          data={flatData}
          keyField="Email"
          selectableRows
          selectableRowsNoSelectAll
          clearSelectedRows
          onSelectedRowsChange={({ selectedRows }) => {
            setSelected(selectedRows);
          }}
          fixedHeader
          pagination
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 50, 100, 200]}
          dense
          striped
        ></DataTable>
      </div>
    </div>
  );
};

export default Spreadsheet;
