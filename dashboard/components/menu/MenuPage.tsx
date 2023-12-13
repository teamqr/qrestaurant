import { MealData } from "@/types/MealData";
import React from "react";
import Meal from "./Meal";
import { MealCategoryData } from "@/types/MealCategoryData";
import Link from "next/link";
import Category from "./Category";

type Props = {
  token: string;
  mealsData: MealData[];
  categoriesData: MealCategoryData[];
};

const MenuPage = (props: Props) => {
  return (
    <div>
      <div className="m-5">
        <h1 className="flex flex-col justify-center items-center m-5">
          Zarządzanie menu
        </h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Cena</th>
              <th>Edytuj</th>
            </tr>
          </thead>
          <tbody>
            {props.mealsData ? (
              props.mealsData.map((meal: MealData, i: number) => (
                <Meal key={i} data={meal} />
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <Link
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max m-5"
        href="/menu/meal/add"
      >
        Dodaj danie do menu
      </Link>
      <h2 className="ml-5">Kategorie</h2>
      <div className="flex flex-row justify-around w-max ml-5">
        {props.categoriesData ? (
          props.categoriesData.map((category: MealCategoryData, i: number) => (
            <Category key={i} data={category} />
          ))
        ) : (
          <></>
        )}
      </div>
      <Link
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max m-5"
        href="/menu/category/add"
      >
        Dodaj kategorię
      </Link>
    </div>
  );
};

export default MenuPage;
