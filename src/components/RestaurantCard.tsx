
import { Link } from "react-router-dom";
import { Restaurant } from "@/data/restaurants";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="restaurant-card overflow-hidden h-full">
        <div className="h-40 overflow-hidden">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurant.cuisineType}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name} logo`}
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{restaurant.deliveryTime}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">₹{restaurant.deliveryFee} fee</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
