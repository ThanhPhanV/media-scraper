import React from "react";
import { AppTitle } from "../components/app-title";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid grid-cols-12 gap-12 funnel-display-300 mx-auto">
      <div className="grid col-span-12">
        <AppTitle />
      </div>
      <div className="grid col-span-12">
        <div className="w-[100%] md:w-[30%] mx-auto p-5 border border-gray-200 rounded-2xl min-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
