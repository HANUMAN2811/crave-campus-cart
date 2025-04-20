import { useParams } from "react-router-dom";
import { getRestaurantById } from "@/data/restaurants";
import MenuItem from "@/components/MenuItem";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock, Star, MapPin, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import OrderAssistant from "@/components/OrderAssistant";

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const restaurant = id ? getRestaurantById(id) : undefined;
  const cartItemCount = useCartStore(state => state.getCartItemCount());
  
  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
        <p className="mb-6">Sorry, we couldn't find the restaurant you're looking for.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  // Get unique categories
  const categories = ["all", ...new Set(restaurant.menu.map(item => item.category))];
  
  // Filter menu items by category
  const menuItems = selectedCategory === "all"
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Restaurant Cover Image */}
      <div className="h-48 md:h-64 overflow-hidden relative">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
        <Link to="/" className="absolute top-4 left-4">
          <Button variant="secondary" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Restaurant Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white p-2 rounded-md shadow-sm mr-4">
                <img
                  src={restaurant.logo}
                  alt={`${restaurant.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <p className="text-gray-600">{restaurant.cuisineType}</p>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span>Campus Area</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/cart">
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>View Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-1 bg-white text-brand-orange rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 py-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`whitespace-nowrap ${
                      selectedCategory === category ? "bg-brand-orange" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-4 mb-8">
              {menuItems.map(item => (
                <MenuItem key={item.id} item={item} restaurantId={restaurant.id} />
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <OrderAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
