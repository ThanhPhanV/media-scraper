import HomePage from "./pages/home-page";
import SignInPage from "./pages/sign-in-page";

export const AppRoutes = [
  {
    path: "/",
    element: HomePage,
    isPrivate: true,
  },
  {
    path: "/sign-in",
    element: SignInPage,
    isPrivate: false,
  },
];
