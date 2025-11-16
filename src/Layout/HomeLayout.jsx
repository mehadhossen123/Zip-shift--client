import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/footer/Footer";

const HomeLayout = () => {
  return (
    <>
      {/* Full Width Navbar */}
      <nav className="w-full">
        <Navbar />
      </nav>

      {/* Centered Content */}
      <main className="max-w-7xl mx-auto px-4">
        <Outlet />
      </main>

      {/* Full Width Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
};

export default HomeLayout;
