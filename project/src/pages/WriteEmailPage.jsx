import React, { useState } from "react";

import backgroundImage from "../assets/Background.png";

import EmailForm from "../components/EmailForm";
import Codewords from "../components/Codewords";
import ApproveModal from "../components/ApproveModal";

const WriteEmailPage = ({ goldData }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleApproveClick = () => {
    toggleModal();
  };
  const toggleModal = () => setOpenModal(!openModal);
  return (
    <>
      <div
        className="min-h-screen overflow-x-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex pt-[170px] px-20 max-h-screen">
          <div className="w-3/4 mx-auto">
            <EmailForm handleApproveClick={handleApproveClick} />
          </div>
          <div className="flex  pt-[104px]  w-1/4 ">
            <Codewords />
          </div>
        </div>
      </div>
      <ApproveModal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-lg font-semibold mb-4">Select a spreadsheet:</h2>
        <ul className="border rounded-lg divide-y divide-gray-200">
          <li className="px-4  py-3 hover:bg-gray-100 cursor-pointer transition">
            hei
          </li>
        </ul>
      </ApproveModal>
    </>
  );
};

export default WriteEmailPage;
