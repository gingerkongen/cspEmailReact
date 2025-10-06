import React, { useState, useContext } from "react";

import backgroundImage from "../assets/Background.png";

import { AuthContext } from "../context/AuthContext";

import EmailForm from "../components/EmailForm";
import Codewords from "../components/Codewords";
import ApproveModal from "../components/ApproveModal";
import SendingModal from "../components/SendingModal";

const WriteEmailPage = ({ goldData }) => {
  const { authToken } = useContext(AuthContext);

  const [isSending, setIsSending] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSendingModal, setOpenSendingModal] = useState();
  const [rawEmail, setRawEmail] = useState({
    reciever: "",
    subject: "",
    body: "",
  });
  const [sendingCount, setSendingCount] = useState("0/0");
  const [sendingLog, setSendingLog] = useState([]);

  const handleApproveClick = (emailSubjectText, emailBodyText) => {
    setRawEmail({ subject: emailSubjectText, body: emailBodyText });
    toggleModal();
  };
  const toggleModal = () => setOpenModal(!openModal);

  const sendEmails = async (validatedEmails) => {
    setOpenSendingModal(true);
    if (validatedEmails.length > 0) {
      setIsSending(true);
      setSendingCount(`${0}/${validatedEmails.length}`);
      setSendingLog([]);

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const jitter = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));

      for (let i = 0; i < validatedEmails.length; i++) {
        try {
          const response = await fetch(
            "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                raw: validatedEmails[i].emailInBtoaFormat,
              }),
            }
          );

          if (!response.ok) {
            const err = await response.json();
            throw new Error(`Error while sending: ${err.error.message}`);
          }

          console.log(`Email sent to ${validatedEmails[i].recieverEmail}`);
          setSendingCount(`${i + 1}/${validatedEmails.length}`);
          setSendingLog((prev) => [
            ...prev,
            `Email sent to ${validatedEmails[i].recieverEmail}`,
          ]);
          await sleep(jitter(1000, 3000));
        } catch (error) {
          console.error(
            `Could not send email to ${validatedEmails[i].recieverEmail}:`,
            error.message
          );
          setSendingLog((prev) => [
            ...prev,
            `Could not send email to ${validatedEmails[i].recieverEmail}: ${error.message}`,
          ]);
        }
      }
      setIsSending(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen overflow-x-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex pt-[170px] px-20 max-h-screen">
          <div className="w-3/4 mx-auto">
            <EmailForm
              handleApproveClick={(emailSubjectText, emailBodyText) =>
                handleApproveClick(emailSubjectText, emailBodyText)
              }
            />
          </div>
          <div className="flex  pt-[104px]  w-1/4 ">
            <Codewords />
          </div>
        </div>
      </div>
      <ApproveModal
        goldData={goldData}
        rawEmail={rawEmail}
        open={openModal}
        onClose={() => setOpenModal(false)}
        sendEmails={(validatedEmails) => sendEmails(validatedEmails)}
      />
      <SendingModal
        open={openSendingModal}
        onClose={() =>
          isSending === false
            ? setOpenSendingModal(false)
            : alert("Window must be open while emails are being sent")
        }
        sendingCount={sendingCount}
        sendingLog={sendingLog}
        isSending={isSending}
      ></SendingModal>
    </>
  );
};

export default WriteEmailPage;
