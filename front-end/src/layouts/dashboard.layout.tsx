import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import React from "react";
import { AppTitle } from "../components/app-title";
import { HeaderTitle } from "../components/h1-header";
import { AppMenu } from "../components/menu";
import { AppLoadingProgress } from "../components/progress/app-loading";
import { useAppAuth } from "../hooks/auth-hook";
import { useAppLoading } from "../hooks/use-app-loading";

export function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user, logout } = useAppAuth();
  const { isLoading } = useAppLoading();
  return (
    <div className="grid grid-cols-12 funnel-display-300 mx-auto">
      {isLoading && <AppLoadingProgress />}
      <div className="grid col-span-12">
        <div className="flex items-center justify-between">
          <AppTitle />
          <div className="flex items-center px-5">
            <div className="mr-2">{user?.userName} </div>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
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
