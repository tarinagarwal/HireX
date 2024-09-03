import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="custom-background"></div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
