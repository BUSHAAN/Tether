import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationConfig } from "./Navigation-config";
import { useAuthStore } from "../store/useAuthStore";

const Router = () => {
  const { authUser } = useAuthStore();
  return (
    <Routes>
      {NavigationConfig.map(({ path, element, isProtected, guestOnly }, index) => (
        <Route
          key={index}
          path={path}
          element={
            path === "/*" ? (
              element
            ) : isProtected ? (
              authUser ? (
                element
              ) : (
                <Navigate to="/login" replace />
              )
            ) : guestOnly && authUser ? (
              <Navigate to="/chat" replace />
            ) : (
              element
            )
          }
        />
      ))}
    </Routes>
  );
};

export default Router;
