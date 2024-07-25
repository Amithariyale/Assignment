import React, { useState } from "react";
import SignIn from "./Signin";
import Login from "./Login";
import { useSelector } from "react-redux";
import MyTable from "./Table";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("signin");
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);
  const setPage = (pageName) => {
    setCurrentPage(pageName);
  };
  return isLoggedIn ? (
    <MyTable />
  ) : (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#007786",
      }}
    >
      {currentPage === "signin" ? (
        <SignIn setPage={setPage} />
      ) : (
        <Login setPage={setPage} />
      )}
    </div>
  );
};

export default Home;
