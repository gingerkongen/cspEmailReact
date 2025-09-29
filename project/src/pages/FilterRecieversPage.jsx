import React, { useState, useContext, useEffect } from "react";

import backgroundImage from "../assets/Background.png";

import SelectSheetButton from "../components/SelectSheetButton";
import Modal from "../components/Modal";
import Spreadsheet from "../components/Spreadsheet";

import { AuthContext } from "../context/AuthContext";

const FilterRecieversPage = ({ deliverGoldData }) => {
  const { authToken } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [sheets, setSheets] = useState();
  //using a simple medallion-like architecture
  //bronzeData is the raw input data minus unvalid rows (filtered based on missing or misspelled values)
  //silverData is the data after being filtered by the user within the web app
  //silverData is passed on to the WriteEmailPage and recieved as gold data,
  // and equals the actual data used for sending
  const [bronzeData, setBronzeData] = useState();
  const [silverData, setSilverData] = useState();

  const handleSelectSheetButtonClick = () => {
    toggleModal();
    handleFetchAllSheets();
  };

  const toggleModal = () => setOpenModal(!openModal);

  const handleFetchAllSheets = async () => {
    try {
      const sheetUrl =
        'https://www.googleapis.com/drive/v3/files?q=mimeType="application/vnd.google-apps.spreadsheet"&fields=files(id,name)';
      const response = await fetch(sheetUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response) {
        throw new Error("Could not fetch sheet");
      }
      const sheetData = await response.json();
      setSheets(sheetData.files);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedSheet = async (sheetId) => {
    try {
      if (!sheetId) {
        throw new Error(`Could not fetch selected sheet`);
      }
      setBronzeData(null);
      const rangesD1 = "ranges=D1-TOP!A1:G250&ranges=D1-BOTTOM!A1:G250";
      const rangesD2 = "ranges=D2-TOP!A1:G250&ranges=D2-BOTTOM!A1:G250";
      const rangesD3 = "ranges=D3-TOP!A1:G250&ranges=D3-BOTTOM!A1:G250";
      const rangesNaia = "ranges=NAIA!A1:G250";
      const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${rangesD1}&${rangesD2}&${rangesD3}&${rangesNaia}`;
      const response = await fetch(sheetUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response) {
        const rawSheetData = await response.json();

        const parsedAll = rawSheetData.valueRanges.map((vr) => {
          const values = vr.values;

          if (values.length === 0) return;

          const [headers, ...rows] = values;

          const allowedColumnOne = [
            "D1-TOP",
            "D1-BOTTOM",
            "D2-TOP",
            "D2-BOTTOM",
            "D3-TOP",
            "D3-BOTTOM",
            "NAIA",
          ];
          const cleanRows = rows.filter(
            (row) =>
              typeof row[4] === "string" &&
              row[4].includes("@") &&
              allowedColumnOne.includes(row[0]) &&
              row[1].length > 0 &&
              row[2].length > 0 &&
              row[3].length > 0
          );

          const objects = cleanRows.map((row, i) =>
            Object.fromEntries(headers.map((h, j) => [h, row[j] ?? ""]))
          );
          return objects;
        });
        const parsedAndClean = parsedAll.filter((row) => row.length > 0);
        setOpenModal(false);
        setBronzeData(parsedAndClean.flat());
      } else {
        throw new Error("No available data for selected sheet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (silverData) {
      deliverGoldData(silverData);
    }
  }, [silverData]);

  return (
    <>
      <div
        className="min-h-screen overflow-x-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="pt-30 px-20 h-screen">
          <div>
            <SelectSheetButton onClick={handleSelectSheetButtonClick} />
          </div>

          <div className="pt-5">
            {bronzeData ? (
              <Spreadsheet
                changedData={(data) => setSilverData(data)}
                data={bronzeData}
              />
            ) : null}
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Select a spreadsheet:</h2>
        <ul className="border rounded-lg divide-y divide-gray-200">
          {Array.isArray(sheets) && sheets.length > 0 ? (
            sheets.map((sheet) => (
              <li
                key={sheet.id}
                onClick={() => handleSelectedSheet(sheet.id)}
                className="px-4  py-3 hover:bg-gray-100 cursor-pointer transition"
              >
                {sheet.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500">
              No available spreadsheets
            </li>
          )}
        </ul>
      </Modal>
    </>
  );
};

export default FilterRecieversPage;
