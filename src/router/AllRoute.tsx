import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ScriptDom from "../pages/ScriptDom";
import Choose from "../pages/Choose";

function AllRoute() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="" element={<Choose />} />
        <Route path="script" element={<ScriptDom />} />
      </Route>
    </Routes>
  );
}

export default AllRoute;
