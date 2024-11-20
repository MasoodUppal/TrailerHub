import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/details/Details";
import Catalog from "../pages/Catalog";


import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Terms from "../pages/termsofService/Terms";
import Live from "../pages/live/LIve";
import FAQ from "../pages/faq/Faq";
import Premium from "../pages/premium/premium";
import Privacy from "../pages/privacyPolicy/Privacy";

const AppRoutes = () => {
  return (
    <Routes>
      {/* main dynamic routes */}
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Details />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" element={<Home />} />

      {/* footer Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/live" element={<Live />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/privacy" element={<Privacy />} />
      
    </Routes>
  );
};

export default AppRoutes;
