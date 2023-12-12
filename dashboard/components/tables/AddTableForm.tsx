import { TableData } from "@/types/TableData";
import { addTable } from "@/utils/apiUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Alert from "../Alert";

type Props = {
  token: string;
  tables: TableData[];
};

const AddTableForm = async (props: Props) => {
  const isNumberInList = async (number: number, tables: TableData[]) => {
    "use server";
    return !!tables.find((table: TableData) => table.number == number);
  };

  const generateRandomPrefix = async () => {
    "use server";
    let prefix = "";
    const length = 2;
    const allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
      prefix += allowedCharacters.charAt(
        Math.floor(Math.random() * allowedCharacters.length)
      );
    }
    return prefix;
  };

  const generatePrefix = async () => {
    "use server";
    let prefix = "00";
    const tables = props.tables;
    do {
      prefix = await generateRandomPrefix();
    } while (!!tables.find((table) => table.prefix == prefix));
    return prefix;
  };

  const addTableAction = async (formData: FormData) => {
    "use server";
    const number = formData.get("number")?.valueOf() as number;
    const prefix = await generatePrefix();
    if (await isNumberInList(number, props.tables)) {
      const error = "tableNumberConflict";
      redirect(`/tables/add?error=${error}`);
    }
    await addTable(number, prefix, props.token);
    redirect("/tables");
  };
  return (
    <div className="m-5">
      <Alert />
      <form
        id="addTableForm"
        className="flex flex-col justify-start items-start m-5"
        action={addTableAction}
      >
        <h2>Numer stolika</h2>
        <input
          className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
          type="number"
          name="number"
          size={3}
          step="1"
          required={true}
          placeholder="Numer stolika"
        />

        <div className="flex flex-row justify-between">
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
            type="submit"
          >
            Dodaj
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

export default AddTableForm;
