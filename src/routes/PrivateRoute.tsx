import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { guest, isLoggedIn } = useAppSelector((state) => state.user);
  if (!guest && isLoggedIn) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
