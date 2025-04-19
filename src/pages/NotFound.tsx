
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-brand-orange mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. Perhaps you're hungry?
          Let's get you back to ordering some food!
        </p>
        <Link to="/">
          <Button className="bg-brand-orange hover:bg-brand-orange/90">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
