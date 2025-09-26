import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <button
      onClick={logoutUser}
      className="py-1 px-2 border rounded-md cursor-pointer hover:scale-110"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
