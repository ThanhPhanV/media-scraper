import ScraperPage from "./pages/scraper-page";
import SignInPage from "./pages/sign-in-page";

export const AppRoutes = [
  {
    path: "/",
    element: ScraperPage,
    isPrivate: true,
  },
  {
    path: "/sign-in",
    element: SignInPage,
    isPrivate: false,
  },
];
