export type Restaurant = {
  id: string;
  name: string;
  menuId: number | null;
};

export type Meal = {
  id: number;
  menuId: number;
  name: string;
  price: number;
  description: string;
};

export type Table = {
  id: string;
  restaurantId: number;
  prefix: string;
  number: number;
  code: string;
};
