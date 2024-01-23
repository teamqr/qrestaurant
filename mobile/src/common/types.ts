export type Restaurant = {
  id: number;
  name: string;
  menuId: number | null;
};

export type Meal = {
  id: number;
  menuId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  mealCategoryIds: number[];
};

export type Table = {
  id: number;
  restaurantId: number;
  prefix: string;
  number: number;
  code: string;
};

export type MealCategory = {
  id: number;
  name: string;
  restaurantId: number;
  mealIds: number[];
};

export type OrderStatus = "IN_PROGRESS" | "CANCELED" | "COMPLETED";

export type Order = {
  id: number;
  completionDate: string;
  orderDate: string;
  mealOrderIds: number[];
  price: number;
  restaurantId: number;
  tableId: number;
  userId: number;
  status: OrderStatus;
};

export type MealOrder = {
  id: number;
  mealId: number;
  orderId: number;
  amount: number;
};

export type OrderSummary = Omit<Order, "mealOrderIds"> & {
  meals: {
    id: number;
    name: string;
    description: string;
    totalPrice: number;
    amount: number;
  }[];
};

export type AppUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  orderIds: number[];
};
