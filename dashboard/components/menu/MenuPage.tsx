"use client";
import { MealData } from "@/types/MealData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Meal from "./Meal";

type Props = {
  token: string;
  mealsData: MealData[];
};

const MenuPage = (props: Props) => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != "ADMIN" || !props.token) {
    redirect("/");
  }
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