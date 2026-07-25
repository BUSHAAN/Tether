import type { ReactElement } from "react";
import Error404Page from "../pages/404";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import SignUpPage from "../pages/SignUpPage";

export type NavRoute = {
  title: string;
  path: string;
  element: ReactElement;
  isProtected: boolean;
  /** Auth pages only — redirect signed-in users to the chat app */
  guestOnly?: boolean;
};

export const NavigationConfig: NavRoute[] = [
  {
    title: "Landing",
    path: "/",
    element: <LandingPage />,
    isProtected: false,
  },
  {
    title: "Chat",
    path: "/chat",
    element: <HomePage />,
    isProtected: true,
  },
  {
    title: "Login",
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
    guestOnly: true,
  },
  {
    title: "SignUp",
    path: "/signup",
    element: <SignUpPage />,
    isProtected: false,
    guestOnly: true,
  },
  {
    title: "Settings",
    path: "/settings",
    element: <SettingsPage />,
    isProtected: true,
  },
  {
    title: "Profile",
    path: "/profile",
    element: <ProfilePage />,
    isProtected: true,
  },
  {
    title: "404",
    path: "/*",
    element: <Error404Page />,
    isProtected: false,
  },
];
