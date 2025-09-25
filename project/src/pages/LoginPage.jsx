import React, { useContext, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Logo.png.avif";
import backgroundImage from "../assets/Background.png";

const LoginPage = () => {
  const { loginUser, CLIENT_ID } = useContext(AuthContext);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-xl">
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 p-8">
            <div className="mx-auto mb-6 h-40 w-40 justify-center items-center ">
              <img
                className="rounded-lg w-4/5
                        mx-2 my-4"
                src={logo}
                alt="logo"
              ></img>
            </div>

            <h1 className="text-center text-2xl font-bold text-gray-900">
              CSP Email Service
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Log in with Google to continue
            </p>

            <div className="mt-8 flex justify-center">
              <div>
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    loginUser(credentialResponse)
                  }
                  onError={() => console.log("Login Failed")}
                  theme="outline"
                  size="large"
                  shape="pill"
                  text="continue_with"
                  logo_alignment="left"
                  width="400"
                />
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Contact andreasgundersen78@gmail.com for access
            </div>

            <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"></div>
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl"></div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} CS Prospects
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
