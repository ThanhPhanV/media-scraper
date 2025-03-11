import MediaPage from "./pages/media-page";
import ScraperPage from "./pages/scraper-page";
import SignInPage from "./pages/sign-in-page";

export const AppRoutes = [
  {
    path: "/",
    element: ScraperPage,
    name: "Scraper",
    isPrivate: true,
  },
  {
    path: "/media",
    element: MediaPage,
    name: "Media",
    isPrivate: true,
  },
  {
    path: "/sign-in",
    element: SignInPage,
    name: "Sign In",
    isPrivate: false,
    excludeSidebar: true,
  },
];
