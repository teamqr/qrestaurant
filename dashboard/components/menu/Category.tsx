import { MealCategoryData } from "@/types/MealCategoryData";
import React from "react";

type Props = {
  data: MealCategoryData;
};

const Category = (props: Props) => {
  const deleteCategoryAction = async () => {
    "use server";
    console.log(`deleteCategory with id: ${props.data.id}`);
  };
  return (
    <div className="flex flex-row justify-around w-max mr-2 my-2 bg-white rounded-md text-black">
      <div className="p-1 mr-2">{props.data.name}</div>
      <form action={deleteCategoryAction}>
        <button className="flex hover:bg-red-400 rounded-md p-1">X</button>
      </form>
    </div>
  );
};

export default Category;
