import {
  deleteCategory,
  editCategory,
  fetchCategoryData,
} from "@/utils/apiUtils";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ReactiveInput from "../ReactiveInput";

type Props = {
  id: number;
  token: string;
};

const EditCategoryForm = async (props: Props) => {
  revalidateTag("categories");
  const categoryData = await fetchCategoryData(props.id, props.token);
  let initialName = categoryData.name;

  const editCategoryAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    await editCategory(props.id, name, props.token);
    redirect("/menu");
  };

  const deleteCategoryAction = async () => {
    "use server";
    await deleteCategory(props.id, props.token);
    redirect("/menu");
  };

  return (
    <div>
      <form
        id="editCategoryForm"
        action={editCategoryAction}
        className="flex flex-col justify-start items-start"
      >
        <div className="flex justify-around">
          <div className="p-5">
            <h2>Nazwa</h2>
            <ReactiveInput
              type="text"
              name="name"
              required={true}
              value={initialName}
              placeholder="Nazwa kategorii"
            />
            <div className="flex flex-row justify-between">
              <button
                className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
                type="submit"
              >
                Zapisz
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
      <form
        id="deleteCategoryForm"
        className="flex flex-col justify-start items-start"
        action={deleteCategoryAction}
      >
        <button
          className="block rounded-md border-0  py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 mx-5"
          type="submit"
        >
          Usuń kategorię
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
