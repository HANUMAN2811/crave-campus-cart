
import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = useCartStore(state => state.getCartItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-brand-orange font-bold text-2xl">CraveCampusCart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-brand-orange transition-colors">
            Home
          </Link>
          <Link to="/restaurants" className="font-medium hover:text-brand-orange transition-colors">
            Restaurants
          </Link>
          <Link to="/offers" className="font-medium hover:text-brand-orange transition-colors">
            Offers
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <Link to="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-2 px-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className="font-medium py-2 hover:text-brand-orange transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              className="font-medium py-2 hover:text-brand-orange transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              to="/offers"
              className="font-medium py-2 hover:text-brand-orange transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Offers
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
