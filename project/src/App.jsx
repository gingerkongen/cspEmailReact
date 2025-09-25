import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FilterRecieversPage from "./pages/FilterRecieversPage";

import ProtectedRoute from "./utils/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/NavBar";

function App() {
  const CLIENT_ID =
    "33693852663-dlrccj4ptirhmjjffdppjkki8gn5jbsh.apps.googleusercontent.com";

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/filter-recievers"
                element={<FilterRecieversPage />}
              />
            </Route>

            <Route path="" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
