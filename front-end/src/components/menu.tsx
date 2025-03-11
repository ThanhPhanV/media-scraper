import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../route";

export function AppMenu() {
  const location = useLocation();
  const nav = useNavigate();
  return (
    <div>
      {AppRoutes.filter((r) => !r.excludeSidebar).map((route) => {
        let classN =
          "flex justify-between items-center cursor-pointer hover:bg-gray-100 p-4 select-none rounded-lg";
        if (location.pathname === route.path) {
          classN += " menu-item-selected";
        }
        return (
          <div
            key={route.path}
            className={classN}
            onClick={() => nav(route.path)}
          >
            <div>{route.name}</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
