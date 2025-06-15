import Error404Page from "../pages/404";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import SignUpPage from "../pages/SignUpPage";

export const NavigationConfig = [
  {
    title: "Home",
    path: "/",
    element: <HomePage />,
    isProtected: true,
  },
  {
    title: "Login",
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
  },
  {
    title: "SignUp",
    path: "/signup",
    element: <SignUpPage />,
    isProtected: false,
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
