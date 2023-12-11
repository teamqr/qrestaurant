import MenuPage from "@/components/menu/MenuPage";
import { MealData } from "@/types/MealData";
import { fetchMealsData, fetchMenuData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

const MenuManagement = async () => {
  revalidatePath("/menu");
  const token: string = await checkAdminAccess();

  await fetchMenuData(token);
  const mealsData: MealData[] = await fetchMealsData(token);
  mealsData.sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    } else if (a.id < b.id) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <MenuPage token={token} mealsData={mealsData} />

      <Link
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max m-5"
        href="/menu/meal/add"
      >
        Dodaj danie do menu
      </Link>
    </div>
  );
};

export default MenuManagement;
