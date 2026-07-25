import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./router/router";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const APP_NAV_ROUTES = ["/chat", "/profile", "/settings"];

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { pathname } = useLocation();
  const showAppNav = Boolean(
    authUser && APP_NAV_ROUTES.some((r) => pathname.startsWith(r))
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="tether-app flex h-dvh items-center justify-center">
        <Loader className="size-10 animate-spin text-[var(--t-accent)]" />
      </div>
    );

  return (
    <div className="tether-app">
      {showAppNav && <Navbar />}
      <Router />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#121214",
            color: "#f2f2f4",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />
    </div>
  );
}

export default App;
