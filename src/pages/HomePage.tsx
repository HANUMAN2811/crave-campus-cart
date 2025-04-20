import { useState } from "react";
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRestaurants = searchQuery
    ? restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section with staggered animations */}
      <div className="bg-gradient-to-r from-brand-orange to-brand-red rounded-xl overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 md:w-3/5">
            <h1 
              className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Campus Food Delivery Made Easy
            </h1>
            <p 
              className="text-white/90 mb-6 text-lg animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Order from your favorite campus outlets and get food delivered right to your door.
            </p>
            <div 
              className="relative animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Input
                placeholder="Search for food or restaurants..."
                className="pl-10 py-6 w-full rounded-full text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div 
            className="p-6 md:w-2/5 flex justify-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-64 h-64 rounded-full bg-white/20 flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Food delivery"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants section with grid animations */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Restaurants</h2>
          <Button variant="ghost" className="text-brand-orange">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        
        {filteredRestaurants.length === 0 && (
          <div 
            className="text-center py-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-gray-500 mb-4">No restaurants found matching "{searchQuery}"</p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        )}
      </div>

      {/* Features section with slide-in animations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose CraveCampusCart?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-gray-50 p-6 rounded-xl text-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-brand-orange/10 rounded-full mb-4">
              <img src="/placeholder.svg" alt="Fast delivery" className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Quick Delivery</h3>
            <p className="text-gray-600">Your food delivered within minutes, right to your campus location.</p>
          </div>
          
          <div 
            className="bg-gray-50 p-6 rounded-xl text-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-brand-orange/10 rounded-full mb-4">
              <img src="/placeholder.svg" alt="Payment options" className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Easy Payment</h3>
            <p className="text-gray-600">Multiple payment options including UPI, cards, and cash on delivery.</p>
          </div>
          
          <div 
            className="bg-gray-50 p-6 rounded-xl text-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-brand-orange/10 rounded-full mb-4">
              <img src="/placeholder.svg" alt="Food quality" className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Campus Favorites</h3>
            <p className="text-gray-600">All your favorite campus food outlets in one convenient app.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
