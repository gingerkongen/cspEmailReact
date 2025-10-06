import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PreviewEmail from "./PreviewEmail";

const ApproveModal = ({ open, onClose, goldData, rawEmail, sendEmails }) => {
  const [personalizedPreviewEmail, setPersonalizedPreviewEmail] = useState({
    subject: "",
    body: "",
  });

  useEffect(() => {
    setPersonalizedPreviewEmail({
      subject: rawEmail.subject,
      body: rawEmail.body,
    });
  }, [rawEmail, goldData]);

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

  const handleSelectedCoach = (selected) => {
    if (selected) {
      const subject = rawEmail.subject
        .replace(/{{FirstName}}/g, selected.FirstName || "")
        .replace(/{{LastName}}/g, selected.LastName || "")
        .replace(/{{Division}}/g, selected.Division.split("-")[0] || "")
        .replace(/{{Team}}/g, selected.Team || "");

      const body = rawEmail.body
        .replace(/{{FirstName}}/g, selected.FirstName || "")
        .replace(/{{LastName}}/g, selected.LastName || "")
        .replace(/{{Division}}/g, selected.Division.split("-")[0] || "")
        .replace(/{{Team}}/g, selected.Team || "");

      setPersonalizedPreviewEmail({ subject: subject, body: body });
      return;
    }
    setPersonalizedPreviewEmail({
      subject: rawEmail.subject,
      body: rawEmail.body,
    });
  };

  const handleCreateEmails = () => {
    function findInvalidCharForBtoa(str) {
      const m = (str || "").match(
        /[^\x00-\xFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/
      );
      return m ? m[0] : null;
    }

    const validatedEmails = [];
    for (let i = 0; i < goldData.length; i++) {
      const subject = rawEmail.subject
        .replace(/{{FirstName}}/g, goldData[i].FirstName || "")
        .replace(/{{LastName}}/g, goldData[i].LastName || "")
        .replace(/{{Division}}/g, goldData[i].Division.split("-")[0] || "")
        .replace(/{{Team}}/g, goldData[i].Team || "");
      const body = rawEmail.body
        .replace(/{{FirstName}}/g, goldData[i].FirstName || "")
        .replace(/{{LastName}}/g, goldData[i].LastName || "")
        .replace(/{{Division}}/g, goldData[i].Division.split("-")[0] || "")
        .replace(/{{Team}}/g, goldData[i].Team || "");

      const raw = `To: ${goldData[i].Email}\nSubject: ${subject}\n\n${body}`;
      const bad = findInvalidCharForBtoa(raw);

      if (bad) {
        alert(
          `Error when sending to ${goldData[i].Email}: "${bad}" is an invalid character`
        );
        return;
      }
      try {
        const emailInBtoaFormat = btoa(
          `To: ${goldData[i].Email}\n` + `Subject: ${subject}\n\n` + `${body}`
        )
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        validatedEmails.push({
          emailInBtoaFormat: emailInBtoaFormat,
          recieverEmail: goldData[i].Email,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (confirm("All emails created successfully. Send emails?")) {
      onClose();
      sendEmails(validatedEmails);
    } else {
    }
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center
    transition-colors
  ${open ? "visible bg-black/20" : "invisible"}
  `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-white rounded-xl shadow p-6 transition-all
        ${
          open
            ? "scale-100 opacity-100 overflow-auto w-[90%] h-[70%] "
            : "scale-125 opacity-0 overflow-hidden  w-[600px] h-[400px] "
        }
        `}
      >
        <div className="flex align-items justify-center min-w-[90%] h-[90%]">
          <div className="w-3/4 h-[100%] overflow-auto border rounded-md">
            <div className="mt-3 px-3">Message:</div>
            <div className=" flex items-center justify-center w-full h-full px-3">
              <PreviewEmail rawEmail={personalizedPreviewEmail} />
            </div>
          </div>
          <div className="w-1/4 border rounded-md flex flex-col">
            <div className="mt-3 px-3">
              Receivers: {goldData ? goldData.length : 0}{" "}
            </div>
            <div className="flex-1 min-h-0">
              {open ? (
                <DataTable
                  columns={columns}
                  data={goldData}
                  keyField="Email"
                  dense
                  fixedHeader
                  fixedHeaderScrollHeight="53vh"
                  striped
                  selectableRows
                  selectableRowsSingle
                  onSelectedRowsChange={({ selectedRows }) => {
                    const row = selectedRows[0] || null;
                    handleSelectedCoach(row);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex mt-[20px] justify-center">
          <button
            onClick={handleCreateEmails}
            type="button"
            className="px-4 py-2 rounded-md text-white shadow
                     bg-gradient-to-r from-sky-500 to-blue-600 cursor-pointer hover:scale-110"
          >
            Create emails
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
