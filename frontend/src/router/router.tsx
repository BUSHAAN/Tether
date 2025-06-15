import { Navigate, Route, Routes } from "react-router-dom";
import { NavigationConfig } from "./Navigation-config";
import { useAuthStore } from "../store/useAuthStore";

const Router = () => {
  const { authUser } = useAuthStore();
  return (
    <Routes>
      {NavigationConfig.map(({ path, element, isProtected }, index) => (
        <Route
          key={index}
          path={path}
          element={
            path === "/*" ? (
              element
            ) : isProtected ? (
              authUser ? (
                element //route protected user is authenticated
              ) : (
                <Navigate to="/login" replace /> //route protected user is not authenticated
              )
            ) : authUser ? (
              <Navigate to="/" replace /> //route not protected user is authenticated (login/signup)
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
