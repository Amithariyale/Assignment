import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyTable from "./Components/Table";
import Auth from "./Components/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MyTable />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
