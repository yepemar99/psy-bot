import { Navigate } from "react-router-dom";
import useGetMe from "@/hooks/swr/useGetme";

interface PrivateRouteProps {
  isChat?: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data: user, error, isLoading } = useGetMe();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
