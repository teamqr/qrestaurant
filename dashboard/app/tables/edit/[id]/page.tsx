import EditTableForm from "@/components/tables/EditTableForm";
import { TableData } from "@/types/TableData";
import { deleteTable, fetchTablesData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const EditTablePage = async ({ params }: { params: { id: number } }) => {
  const token: string = await checkAdminAccess();
  const tablesData = await fetchTablesData(token);

  const isIdInList = async (id: number, tables: TableData[]) => {
    return !!tables.find((table: TableData) => table.id == id);
  };

  if (!(await isIdInList(params.id, tablesData))) {
    redirect(`/tables`);
  }

  const deleteTableAction = async () => {
    "use server";
    await deleteTable(params.id, token);
    redirect("/tables");
  };

  return (
    <div>
      <EditTableForm id={params.id} token={token} />
      <form
        id="deleteRestaurantForm"
        className="flex flex-col justify-start items-start m-5"
        action={deleteTableAction}
      >
        <button
          className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 mx-5"
          type="submit"
        >
          Usuń stolik
        </button>
      </form>
    </div>
  );
};

export default EditTablePage;
