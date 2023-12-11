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
