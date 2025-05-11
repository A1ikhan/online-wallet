import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Named export
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};