import AddCategoryForm from "@/components/menu/AddCategoryForm";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const AddCategoryPage = async () => {
  const token: string = await checkAdminAccess();
  return (
    <div>
      <h1 className="flex flex-col justify-center items-center m-5">
        Dodaj kategorię dań
      </h1>
      <AddCategoryForm token={token} />
    </div>
  );
};

export default AddCategoryPage;
