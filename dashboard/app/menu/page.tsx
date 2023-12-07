import AddMealForm from "@/components/menu/AddMealForm";
import MenuPage from "@/components/menu/MenuPage";
import { MealData } from "@/types/MealData";
import { MenuData } from "@/types/MenuData";
import { TokenData } from "@/types/TokenData";
import { fetchMealsData, fetchMenuData } from "@/utils/apiUtils";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { revalidatePath } from "next/cache";
import React from "react";

const MenuManagement = async () => {
  revalidatePath("/menu");
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData.role;

  const menuData: MenuData | null = await fetchMenuData(token);
  const mealsData: MealData[] = await fetchMealsData(token);

  return (
    <div>
      <MenuPage token={token} mealsData={mealsData} />
      {token && role == "ADMIN" ? <AddMealForm token={token} /> : <></>}
    </div>
  );
};

export default MenuManagement;
