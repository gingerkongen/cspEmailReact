import React, { useState, useContext } from "react";

import backgroundImage from "../assets/Background.png";

import SelectSheetButton from "../components/SelectSheetButton";
import Filters from "../components/Filters";
import Modal from "../components/Modal";

import { AuthContext } from "../context/AuthContext";

const FilterRecieversPage = () => {
  const { authToken } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [sheets, setSheets] = useState();

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
      const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
      const response = await fetch(sheetUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response) {
        const rawSheetData = await response.json();
        console.log(rawSheetData);
      } else {
        throw new Error("No available data for selected sheet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="min-h-screen   bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <h2 className="text-3xl font-semibold mb-4">Select a spreadsheet:</h2>
          <ul className="border rounded-lg divide-y divide-gray-200">
            {sheets ? (
              sheets.map((sheet, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectedSheet(sheet.id)}
                  className="px-4 text-xl py-3 hover:bg-gray-100 cursor-pointer transition"
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

        <div className="pt-40 px-20 h-screen">
          <div className="flex flex-wrap m-10  overflow-x-hidden min-h-[120px] items-center">
            <div className="w-full sm:w-1/2 md:w-1/3 pl-5 ">
              <SelectSheetButton
                onClick={() => handleSelectSheetButtonClick()}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 pl-5">
              <Filters />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterRecieversPage;
