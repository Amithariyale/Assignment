import React, { useState } from "react";
import SignIn from "./Signin";
import Login from "./Login";

const Auth = () => {
  // State hook to manage the current page ('signin' or 'login')
  const [currentPage, setCurrentPage] = useState("signin");

  // Function to update the current page state
  const setPage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#007786",
      }}
    >
      {/* Conditional rendering of SignIn or Login component based on currentPage state */}
      {currentPage === "signin" ? (
        <SignIn setPage={setPage} />
      ) : (
        <Login setPage={setPage} />
      )}
    </div>
  );
};

export default Auth;
