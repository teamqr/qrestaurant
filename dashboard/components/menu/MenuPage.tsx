import { MealData } from "@/types/MealData";
import React from "react";
import Meal from "./Meal";

type Props = {
  token: string;
  mealsData: MealData[];
};

const MenuPage = (props: Props) => {
  return (
    <div>
      <div className="m-5">
        <h1 className="text-4xl flex flex-col justify-center items-center m-5">
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
    </div>
  );
};

export default MenuPage;
