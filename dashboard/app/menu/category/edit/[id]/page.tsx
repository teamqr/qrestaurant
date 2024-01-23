import EditCategoryForm from "@/components/menu/EditCategoryForm";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const EditCategoryPage = async ({ params }: { params: { id: number } }) => {
  const token: string = await checkAdminAccess();
  return (
    <div>
      <h1 className="flex flex-col justify-center items-center m-5">
        Edytuj danie
      </h1>
      <EditCategoryForm id={params.id} token={token} />
    </div>
  );
};

export default EditCategoryPage;
