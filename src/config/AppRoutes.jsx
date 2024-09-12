import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";
import Catalog from "../pages/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:catagory/search/:keyword" element={<Catalog />} />
      <Route path="/:catagory/:id" element={<Details />} />
      <Route path="/:catagory" element={<Catalog />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
