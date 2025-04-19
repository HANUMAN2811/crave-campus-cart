
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/data/restaurants";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus } from "lucide-react";

interface MenuItemProps {
  item: MenuItemType;
  restaurantId: string;
}

const MenuItem = ({ item, restaurantId }: MenuItemProps) => {
  const { addToCart, removeFromCart, getQuantity } = useCartStore();
  const quantity = getQuantity(restaurantId, item.id);

  return (
    <Card className="menu-item overflow-hidden">
      <CardContent className="p-4 flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{item.name}</h3>
            {item.vegetarian && (
              <span className="inline-block w-4 h-4 border border-green-600 bg-white rounded-sm">
                <span className="block w-2 h-2 mx-auto mt-0.5 bg-green-600 rounded-full"></span>
              </span>
            )}
            {item.popular && (
              <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          <p className="font-medium mt-2">₹{item.price}</p>
        </div>
        
        <div className="ml-4 flex flex-col items-end">
          <div className="h-16 w-16 rounded-md overflow-hidden">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
          
          <div className="mt-2 flex items-center">
            {quantity > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(restaurantId, item.id);
                  }}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(restaurantId, item.id);
                  }}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(restaurantId, item.id);
                }}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
