
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CraveCampusCart</h3>
            <p className="text-gray-600 text-sm">
              Your favorite campus food, delivered fast to your door.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-orange text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-600 hover:text-brand-orange text-sm">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-600 hover:text-brand-orange text-sm">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-brand-orange text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: support@cravecampuscart.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Main Campus Building, Block C</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} CraveCampusCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
