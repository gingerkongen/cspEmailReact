import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <button
      onClick={logoutUser}
      className="py-2 px-3 border text-2xl font-bold h-15 w-30 rounded-md cursor-pointer hover:scale-110"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
