import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./router/router";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const APP_NAV_ROUTES = ["/chat", "/profile", "/settings"];

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const { pathname } = useLocation();
  const showAppNav = Boolean(
    authUser && APP_NAV_ROUTES.some((r) => pathname.startsWith(r))
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      {showAppNav && <Navbar />}
      <Router />
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}

export default App;
