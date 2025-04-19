
import { Card, CardContent } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/store/cartStore";
import { getMenuItemById, getRestaurantById } from "@/data/restaurants";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const menuItem = getMenuItemById(item.restaurantId, item.itemId);
  const restaurant = getRestaurantById(item.restaurantId);

  if (!menuItem || !restaurant) return null;

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{menuItem.name}</h3>
            <p className="text-sm text-muted-foreground">{restaurant.name}</p>
            <p className="font-medium mt-1">₹{menuItem.price}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => updateQuantity(item.restaurantId, item.itemId, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-5 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => updateQuantity(item.restaurantId, item.itemId, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 p-0"
              onClick={() => removeFromCart(item.restaurantId, item.itemId)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-right">
          Subtotal: ₹{menuItem.price * item.quantity}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
