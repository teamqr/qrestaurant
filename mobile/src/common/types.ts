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
