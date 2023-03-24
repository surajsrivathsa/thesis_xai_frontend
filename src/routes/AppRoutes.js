import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { LastLocationProvider } from "react-router-last-location";
import LandingPage from "../pages//LandingPage";
import BookGrid from "../pages/BookGrid";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/search/" element={<BookGrid />} exact />
          <Route path="/search/:id" element={<BookGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
