import React from "react";
import { AppTitle } from "../components/app-title";
import { useAppLoading } from "../hooks/use-app-loading";
import { AppLoadingProgress } from "../components/progress/app-loading";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAppLoading();
  return (
    <>
      {isLoading && <AppLoadingProgress />}
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
    </>
  );
}
