import EditMealForm from "@/components/menu/EditMealForm";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const EditMealPage = async ({ params }: { params: { id: number } }) => {
  const token: string = await checkAdminAccess();

  return (
    <div>
      <h1 className="text-4xl flex flex-col justify-center items-center m-5">
        Edytuj danie
      </h1>
      <EditMealForm id={params.id} token={token} />
    </div>
  );
};

export default EditMealPage;
