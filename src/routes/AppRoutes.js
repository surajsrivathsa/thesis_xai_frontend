import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { LastLocationProvider } from "react-router-last-location";
import LandingPage from "../pages/LandingPage";
import BookGrid from "../pages/BookGrid";
import SearchContainer from "../components/search_bar";
import NavBar from "../components/navbar";
import AboutUs from "../pages/AboutUs";
import StartSession from "../pages/StartSession";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/start-evaluation" element={<StartSession />} exact />
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/search/" element={<BookGrid />} exact />
          <Route path="/search/:id" element={<BookGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
