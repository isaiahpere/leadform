import { Navigate } from "react-router-dom";
import { useProfileState } from "../../context/profileContext";

export const ProtectedRoute = ({ children }) => {
  const { data } = useProfileState();

  if (!data) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};
