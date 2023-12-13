import { MealCategoryData } from "@/types/MealCategoryData";
import { MealData } from "@/types/MealData";
import Link from "next/link";
import React from "react";

type Props = {
  data: MealData;
  categoriesData: MealCategoryData[];
};

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

const Meal = async (props: Props) => {
  const categoryIds = props.data.mealCategoryIds;
  const categoriesData = props.categoriesData;
  const categories = [];
  for (let i in categoryIds) {
    const category = categoriesData.find((c) => c.id === categoryIds[i]);
    if (category) {
      categories.push(` ${category.name}`);
    }
  }
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>#{props.data.id}</td>
      <td>{props.data.name}</td>
      <td>{props.data.description}</td>
      <td>{formatter.format(props.data.price)}</td>
      <td>{categories.toString()}</td>
      <td>
        <Link
          className="block rounded-md border-0 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500"
          href={`/menu/meal/edit/${props.data.id}`}
        >
          Edytuj
        </Link>
      </td>
    </tr>
  );
};

export default Meal;
