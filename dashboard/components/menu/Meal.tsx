import { MealData } from "@/types/MealData";
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
    </tr>
  );
};

export default Meal;
