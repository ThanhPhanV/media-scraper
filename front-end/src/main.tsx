import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./route.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import PrivateRoute from "./components/security/private-component.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {AppRoutes.map((route) => {
          if (route.isPrivate) {
            return (
              <Route key={route.path} element={<PrivateRoute />}>
                <Route path={route.path} element={<route.element />} />
              </Route>
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
