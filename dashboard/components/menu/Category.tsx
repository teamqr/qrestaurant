import { MealCategoryData } from "@/types/MealCategoryData";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";
import React from "react";

type Props = {
  data: MealCategoryData;
};

const Category = (props: Props) => {
  return (
    <div className="flex flex-row justify-around items-center w-max mr-2 my-2 bg-white rounded-md text-black text-m">
      <div className="p-2 mr-2">{props.data.name}</div>
      <Link
        href={`/menu/category/edit/${props.data.id}`}
        className="flex hover:bg-blue-400 py-3 px-2 text-xl rounded-md h-max "
      >
        <IonIcon name="create-outline" />
      </Link>
    </div>
  );
};

export default Category;
