import MenuPage from "@/components/menu/MenuPage";
import { MealCategoryData } from "@/types/MealCategoryData";
import { MealData } from "@/types/MealData";
import {
  fetchCategoriesData,
  fetchMealsData,
  fetchMenuData,
} from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import { revalidatePath } from "next/cache";
import React from "react";

const MenuManagement = async () => {
  revalidatePath("/menu");
  const token: string = await checkAdminAccess();

  await fetchMenuData(token);
  const mealsData: MealData[] = await fetchMealsData(token);
  const categoriesData: MealCategoryData[] = await fetchCategoriesData(token);

  return (
    <div>
      <MenuPage
        token={token}
        mealsData={mealsData}
        categoriesData={categoriesData}
      />
    </div>
  );
};

export default MenuManagement;
