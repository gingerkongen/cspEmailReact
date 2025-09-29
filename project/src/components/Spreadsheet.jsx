import DataTable from "react-data-table-component";
import Search from "./Search";
import Filters from "./Filters";
import React, { useState, useEffect } from "react";

const Spreadsheet = ({ data, changedData }) => {
  //dataRemovedCoaches works as a main pool for the entire sheet
  //The filters and search does not affect this state variable - only the remove individual coaches function
  //As such, the filters can fetch all data from here and we avoid losing data on deselect etc.
  // -this happends directly in the handleRemovedCoaches function and not in a useEffect hook as that would cause bugs
  //displayedData is used to simpliefy the search functionality
  //filteredData is the actual data that will be passed on from this component and used for sending the emails
  const [dataRemovedCoaches, setDataRemovedCoaches] = useState();
  const [displayedData, setDisplayedData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [searchResetKey, setSearchResetKey] = useState(0);

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

  useEffect(() => {
    setDataRemovedCoaches(data);
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (filteredData) {
      setDisplayedData(filteredData);
      changedData(filteredData);
    }
  }, [filteredData]);

  const onSearch = (search) => {
    const searchValue = (search || "").trim().toLowerCase();
    if (searchValue.length === 0) {
      setDisplayedData(filteredData);
      return;
    }
    const searchFiltered = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(searchValue)
      )
    );
    setDisplayedData(searchFiltered);
  };

  const handleFilter = (divisionFilter) => {
    if (dataRemovedCoaches) {
      try {
        const safeDivisionFilter = Array.isArray(divisionFilter)
          ? divisionFilter
          : [];
        if (safeDivisionFilter.length === 0) {
          return;
        }

        const divisionFilteredData = dataRemovedCoaches.filter((row) =>
          safeDivisionFilter.includes(row.Division)
        );
        setSearchResetKey((k) => k + 1);
        onSearch("");
        setFilteredData(divisionFilteredData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectedCoach = (selectedCoach) => {
    try {
      if (selectedCoach.length > 0 && selectedCoach[0].Email) {
        const removedCoachData = dataRemovedCoaches.filter(
          (row) => row.Email !== selectedCoach[0].Email
        );
        setDataRemovedCoaches(removedCoachData);

        if (selectedCoach.length > 0 && selectedCoach[0].Email) {
          const removedCoachDataFromFiltered = filteredData.filter(
            (row) => row.Email !== selectedCoach[0].Email
          );
          setFilteredData(removedCoachDataFromFiltered);
          setSearchResetKey((k) => k + 1);
          onSearch("");
        }

        // alert(
        //   `Successfully removed ${selectedCoach[0].FirstName} ${selectedCoach[0].LastName}`
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" ">
      <div className="flex justify-end">
        <Search onSearch={onSearch} key={searchResetKey} />
        <Filters onFilter={handleFilter} />
      </div>
      <div className="border rounded-md max-h-[70vh] w-full overflow-auto">
        <DataTable
          columns={columns}
          data={displayedData}
          keyField="Email"
          selectableRows
          selectableRowsNoSelectAll
          clearSelectedRows
          onSelectedRowsChange={({ selectedRows }) => {
            handleSelectedCoach(selectedRows);
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
