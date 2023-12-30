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
        <h2>Kategorie</h2>
        <div className="flex flex-row justify-start flex-wrap ">
          {props.categoriesData ? (
            props.categoriesData.map(
              (category: MealCategoryData, i: number) => (
                <Category key={i} data={category} />
              )
            )
          ) : (
            <></>
          )}
          <Link
            className="rounded-md border-0 my-2 py-2 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max 
            flex flex-row justify-center items-center"
            href="/menu/category/add"
          >
            <div className="">Dodaj kategorię</div>
          </Link>
        </div>

        <h2>Menu</h2>

        <table className="w-3/4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Cena</th>
              <th>Kategorie</th>
              <th>Edytuj</th>
            </tr>
          </thead>
          <tbody>
            {props.mealsData ? (
              props.mealsData.map((meal: MealData, i: number) => (
                <Meal
                  key={i}
                  data={meal}
                  categoriesData={props.categoriesData}
                />
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <Link
          className="flex justify-center text-2xl rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-3/4"
          href="/menu/meal/add"
        >
          Dodaj danie do menu
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;
