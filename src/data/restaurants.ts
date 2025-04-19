
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  vegetarian?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: "kathi",
    name: "Kathi Junction",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    cuisineType: "Indian Rolls & Wraps",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 20,
    menu: [
      {
        id: "k1",
        name: "Paneer Kathi Roll",
        description: "Soft roomali roti wrapped with marinated paneer and fresh vegetables",
        price: 120,
        image: "/placeholder.svg",
        category: "Vegetarian Rolls",
        popular: true,
        vegetarian: true
      },
      {
        id: "k2",
        name: "Chicken Kathi Roll",
        description: "Soft roomali roti wrapped with tender chicken pieces and fresh vegetables",
        price: 140,
        image: "/placeholder.svg",
        category: "Non-Vegetarian Rolls",
        popular: true
      },
      {
        id: "k3",
        name: "Egg Kathi Roll",
        description: "Soft roomali roti wrapped with flavorful eggs and fresh vegetables",
        price: 110,
        image: "/placeholder.svg",
        category: "Egg Rolls"
      },
      {
        id: "k4",
        name: "Veg Kathi Roll",
        description: "Soft roomali roti wrapped with mixed vegetables and special masala",
        price: 100,
        image: "/placeholder.svg",
        category: "Vegetarian Rolls",
        vegetarian: true
      }
    ]
  },
  {
    id: "southern",
    name: "Southern Stories",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    cuisineType: "South Indian",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 25,
    menu: [
      {
        id: "s1",
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato filling",
        price: 90,
        image: "/placeholder.svg",
        category: "Dosa",
        popular: true,
        vegetarian: true
      },
      {
        id: "s2",
        name: "Idli Sambar",
        description: "Soft steamed rice cakes served with sambar and chutney",
        price: 80,
        image: "/placeholder.svg",
        category: "Breakfast",
        vegetarian: true
      },
      {
        id: "s3",
        name: "Vada",
        description: "Crispy savory fried snack made from lentil batter",
        price: 60,
        image: "/placeholder.svg",
        category: "Breakfast",
        vegetarian: true
      },
      {
        id: "s4",
        name: "Chettinad Chicken",
        description: "Spicy chicken dish with aromatic spices from Chettinad region",
        price: 180,
        image: "/placeholder.svg",
        category: "Main Course",
        popular: true
      }
    ]
  },
  {
    id: "maggi",
    name: "Maggi Point",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    cuisineType: "Instant Noodles & Snacks",
    rating: 4.0,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    menu: [
      {
        id: "m1",
        name: "Classic Maggi",
        description: "The original instant noodles with classic masala flavor",
        price: 50,
        image: "/placeholder.svg",
        category: "Regular Maggi",
        popular: true,
        vegetarian: true
      },
      {
        id: "m2",
        name: "Cheese Maggi",
        description: "Instant noodles topped with melted cheese",
        price: 70,
        image: "/placeholder.svg",
        category: "Special Maggi",
        vegetarian: true
      },
      {
        id: "m3",
        name: "Masala Maggi",
        description: "Spicy instant noodles with extra masala and vegetables",
        price: 65,
        image: "/placeholder.svg",
        category: "Special Maggi",
        vegetarian: true
      },
      {
        id: "m4",
        name: "Chicken Maggi",
        description: "Instant noodles with chicken pieces and special seasoning",
        price: 85,
        image: "/placeholder.svg",
        category: "Non-Veg Maggi",
        popular: true
      }
    ]
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    cuisineType: "Pizza & Italian",
    rating: 4.2,
    deliveryTime: "30-45 min",
    deliveryFee: 40,
    menu: [
      {
        id: "d1",
        name: "Margherita Pizza",
        description: "Classic pizza with cheese, tomato sauce and basil",
        price: 199,
        image: "/placeholder.svg",
        category: "Classic Pizzas",
        popular: true,
        vegetarian: true
      },
      {
        id: "d2",
        name: "Pepperoni Pizza",
        description: "Pizza topped with cheese and pepperoni slices",
        price: 299,
        image: "/placeholder.svg",
        category: "Non-Veg Pizzas",
        popular: true
      },
      {
        id: "d3",
        name: "Farmhouse Pizza",
        description: "Pizza topped with onion, capsicum, mushroom and corn",
        price: 249,
        image: "/placeholder.svg",
        category: "Veg Pizzas",
        vegetarian: true
      },
      {
        id: "d4",
        name: "Garlic Breadsticks",
        description: "Freshly baked breadsticks with garlic and herb seasoning",
        price: 129,
        image: "/placeholder.svg",
        category: "Sides",
        vegetarian: true
      }
    ]
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getMenuItemById = (restaurantId: string, itemId: string): MenuItem | undefined => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return undefined;
  return restaurant.menu.find(item => item.id === itemId);
};
