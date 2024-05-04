// ProtectedRoute.js
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { isAuthenticated } from 'src/utils/check-logged-in'; // assuming the function is exported from auth.js under utils

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components
  return children;
};

// Define prop types
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
  };
  
export default ProtectedRoute;
