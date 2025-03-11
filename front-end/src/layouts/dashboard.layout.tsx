import React from "react";
import { AppTitle } from "../components/app-title";
import { HeaderTitle } from "../components/h1-header";
import { AppMenu } from "../components/menu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppAuth } from "../hooks/auth-hook";
import { IconButton } from "@mui/material";

export function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user, logout } = useAppAuth();
  return (
    <div className="grid grid-cols-12 funnel-display-300 mx-auto">
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
