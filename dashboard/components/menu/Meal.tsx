import { MealData } from "@/types/MealData";
import Link from "next/link";
import React from "react";

type Props = {
  data: MealData;
};

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

const Meal = (props: Props) => {
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>{props.data.id}</td>
      <td>{props.data.name}</td>
      <td>{props.data.description}</td>
      <td>{formatter.format(props.data.price)}</td>
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
