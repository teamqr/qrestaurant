import AddMealForm from "@/components/menu/AddMealForm";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const AddMealPage = async () => {
  const token: string = await checkAdminAccess();
  return (
    <div>
      <h1 className="flex flex-col justify-center items-center m-5">
        Dodaj danie do menu
      </h1>
      <AddMealForm token={token} />
    </div>
  );
};

export default AddMealPage;
