import React, { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader } from "react-spinners";

const DashboardLayout = () => {
  return (
    <div className="px-5 py-4">
      {/* Dashboard Header */}
      <h1 className=" justify-center text-5xl font-bold flex items-center gap-2">
        Dashboard
        <span className="text-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-12">
          🚀
        </span>
      </h1>

      {/* Suspense for loading */}
      <Suspense fallback={<BarLoader />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
