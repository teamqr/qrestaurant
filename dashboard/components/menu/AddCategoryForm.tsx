import { addCategory } from "@/utils/apiUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  token: string;
};

const AddCategoryForm = (props: Props) => {
  const addCategoryAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    await addCategory(name, props.token);
    redirect("/menu");
  };

  return (
    <form
      action={addCategoryAction}
      className="flex flex-col justify-start items-start"
    >
      <div className="flex justify-around">
        <div className="p-5">
          <h2>Nazwa</h2>
          <input
            className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
            type="text"
            name="name"
            required={true}
            placeholder="Nazwa kategorii"
          />
          <div className="flex flex-row justify-between">
            <button
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
              type="submit"
            >
              Dodaj
            </button>
            <Link
              href="/menu"
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 ml-5"
            >
              Anuluj
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCategoryForm;
