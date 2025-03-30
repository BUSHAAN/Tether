import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Router from "./router/router";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
