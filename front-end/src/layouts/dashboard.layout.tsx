import React from "react";
import { AppTitle } from "../components/app-title";
import { HeaderTitle } from "../components/h1-header";
import { AppMenu } from "../components/menu";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid grid-cols-12 gap-12 funnel-display-300 mx-auto">
      <div className="grid col-span-12">
        <AppTitle />
      </div>
      <div className="grid col-span-3">
        <HeaderTitle title="Menu" />
        <AppMenu />
      </div>
      <div className="grid col-span-9 px-3">
        <HeaderTitle title="Scraper" />
        <div className="px-3">{children}</div>
      </div>
    </div>
  );
}
