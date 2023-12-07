import MenuPage from "@/components/menu/MenuPage";
import { MealData } from "@/types/MealData";
import { MenuData } from "@/types/MenuData";
import { TokenData } from "@/types/TokenData";
import { fetchMealsData, fetchMenuData } from "@/utils/apiUtils";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";

const MenuManagement = async () => {
  const token: string = (await getTokenFromCookies()) as string;

  const menuData: MenuData | null = await fetchMenuData(token);
  const mealsData: MealData[] = await fetchMealsData(token);
  return <MenuPage token={token} mealsData={mealsData} />;
};

export default MenuManagement;
