import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/details/Details";
import Catalog from "../pages/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Details />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
