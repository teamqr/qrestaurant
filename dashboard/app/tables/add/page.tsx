import AddTableForm from "@/components/tables/AddTableForm";
import { fetchTablesData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const AddTablePage = async () => {
  const token: string = await checkAdminAccess();
  const tables = await fetchTablesData(token);

  return (
    <div>
      <h1 className="flex flex-col justify-center items-center m-5">
        Dodaj stolik
      </h1>
      <AddTableForm token={token} tables={tables} />
    </div>
  );
};

export default AddTablePage;
