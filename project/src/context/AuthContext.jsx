import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const CLIENT_ID =
    "33693852663-dlrccj4ptirhmjjffdppjkki8gn5jbsh.apps.googleusercontent.com";
  const SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
  ].join(" ");

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  const navigate = useNavigate();

  const loginUser = (credentialResponse) => {
    setAuthToken(credentialResponse.access_token);
    localStorage.setItem(
      "authToken",
      JSON.stringify(credentialResponse.access_token)
    );
    navigate("home/");
  };

  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("");
    try {
      googleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    authToken: authToken,
    CLIENT_ID: CLIENT_ID,
    SCOPES: SCOPES,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
