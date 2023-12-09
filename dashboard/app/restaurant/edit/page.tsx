import EditRestaurantForm from "@/components/restaurant/EditRestaurantForm";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const EditRestaurant = async () => {
  const token: string = await checkAdminAccess();
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
