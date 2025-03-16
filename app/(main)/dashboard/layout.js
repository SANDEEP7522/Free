import React, { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader } from "react-spinners";


const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Suspense fallback={ <BarLoader /> }>
        <DashboardPage />
      </Suspense>

      {/* Dashboard page layout */}
    </div>
  );
};

export default DashboardLayout;
