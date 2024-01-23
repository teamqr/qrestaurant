import { editTable, fetchTableData, fetchTablesData } from "@/utils/apiUtils";
import { revalidateTag } from "next/cache";
import React from "react";
import ReactiveInput from "../ReactiveInput";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableData } from "@/types/TableData";
import Alert from "../Alert";

type Props = {
  id: number;
  token: string;
};

const EditTableForm = async (props: Props) => {
  revalidateTag("tables");
  const tableData = await fetchTableData(props.id, props.token);
  const tablesData = await fetchTablesData(props.token);
  const initialNumber = tableData.number;

  const isNumberInList = async (number: number, tables: TableData[]) => {
    "use server";
    return !!tables.find((table: TableData) => table.number == number);
  };

  const editTableAction = async (formData: FormData) => {
    "use server";
    const number = formData.get("number")?.valueOf() as number;
    if (await isNumberInList(number, tablesData)) {
      const error: string = "tableNumberConflict";
      redirect(`/tables/edit/${props.id}?error=${error}`);
    }

    await editTable(props.id, number, props.token);
    redirect("/tables");
  };

  return (
    <div className="m-5 w-min">
      <Alert />
      <form
        id="editRestaurantForm"
        className="flex flex-col justify-start items-start m-5"
        action={editTableAction}
      >
        <h2>Nazwa</h2>
        <ReactiveInput
          type="number"
          name="number"
          step="1"
          required={true}
          value={initialNumber}
          placeholder="Numer stolika"
        />
        <div className="flex flex-row justify-between">
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
            type="submit"
          >
            Zapisz
          </button>

          <Link
            href="/tables"
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 ml-5"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTableForm;
