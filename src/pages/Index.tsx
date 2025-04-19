
import { Navigate } from "react-router-dom";

// This page simply redirects to the main home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
