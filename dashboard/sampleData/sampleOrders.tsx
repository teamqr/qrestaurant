import { OrderData } from "@/types/OrderData";

export const order1: OrderData = {
  id: 1,
  price: 35.8,
  status: false,
  orderDate: new Date(),
  completionDate: null,
  tableId: 17,
  restaurantId: 1,
  orderEntries: [
    { id: 1, mealId: 2, amount: 1 },
    { id: 2, mealId: 3, amount: 2 },
    { id: 3, mealId: 13, amount: 1 },
  ],
};

export const order2: OrderData = {
  id: 2,
  price: 25.8,
  status: false,
  orderDate: new Date(),
  completionDate: null,
  tableId: 13,
  restaurantId: 1,
  orderEntries: [
    { id: 4, mealId: 22, amount: 3 },
    { id: 5, mealId: 16, amount: 2 },
    { id: 6, mealId: 17, amount: 1 },
    { id: 13, mealId: 3, amount: 2 },
    { id: 14, mealId: 2, amount: 3 },
  ],
};

export const completeOrder1: OrderData = {
  id: 3,
  price: 25.8,
  status: true,
  orderDate: new Date(),
  completionDate: new Date(),
  tableId: 20,
  restaurantId: 1,
  orderEntries: [
    { id: 7, mealId: 22, amount: 3 },
    { id: 8, mealId: 16, amount: 2 },
    { id: 9, mealId: 17, amount: 1 },
  ],
};

export const completeOrder2: OrderData = {
  id: 4,
  price: 25.8,
  status: true,
  orderDate: new Date(),
  completionDate: new Date(),
  tableId: 17,
  restaurantId: 1,
  orderEntries: [
    { id: 10, mealId: 22, amount: 1 },
    { id: 11, mealId: 16, amount: 2 },
    { id: 12, mealId: 17, amount: 2 },
  ],
};

export const sampleOrders: OrderData[] = [
  order1,
  order2,
  order1,
  order2,
  order1,
  order2,
  order1,
  order2,
  order2,
];
export const completeOrders: OrderData[] = [
  completeOrder1,
  completeOrder2,
  completeOrder1,
  completeOrder2,
  completeOrder1,
  completeOrder2,
  completeOrder1,
  completeOrder2,
];

export function getSampleOrders() {
  return sampleOrders;
}

export function getCompleteOrders() {
  return completeOrders;
}
