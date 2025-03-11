import React from "react";
import { AppTitle } from "../components/app-title";
import { HeaderTitle } from "../components/h1-header";
import { AppMenu } from "../components/menu";

export function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="grid grid-cols-12 funnel-display-300 mx-auto">
      <div className="grid col-span-12">
        <AppTitle />
      </div>
      <div className="grid col-span-3 mt-3">
        <div>
          <AppMenu />
        </div>
      </div>
      <div className="grid col-span-9 px-3">
        <HeaderTitle title={title ?? ""} />
        <div className="px-3">{children}</div>
      </div>
    </div>
  );
}
