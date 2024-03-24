import { Route, useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface PrivateRouteProps {
  path: string;
  element: ReactElement;
}

export const PrivateRoute = ({ element, path }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token")

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  return <Route path={path} element={element} />;
}