import EditRestaurantForm from "@/components/restaurant/EditRestaurantForm";
import { Role } from "@/types/Role";
import { TokenData } from "@/types/TokenData";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const EditRestaurant = async () => {
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData.role;
  if (role != Role.ADMIN) {
    redirect("/");
  }
  return (
    <div>
      <h1 className="text-4xl flex flex-col justify-center items-center m-5">
        Edytuj dane restauracji
      </h1>
      <EditRestaurantForm token={token} />
    </div>
  );
};

export default EditRestaurant;
