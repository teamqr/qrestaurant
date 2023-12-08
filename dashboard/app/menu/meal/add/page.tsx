import AddMealForm from "@/components/menu/AddMealForm";
import { TokenData } from "@/types/TokenData";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const AddMealPage = async () => {
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData.role;
  if (role != "ADMIN") {
    redirect("/");
  }
  return (
    <div>
      <h1 className="text-4xl flex flex-col justify-center items-center m-5">
        Dodaj danie do menu
      </h1>
      <AddMealForm token={token} />
    </div>
  );
};

export default AddMealPage;
