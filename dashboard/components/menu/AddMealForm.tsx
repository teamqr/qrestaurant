import { addMeal, fetchCategoriesData } from "@/utils/apiUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ReactiveFileInput from "../ReactiveFileInput";
import ReactiveCategorySelect from "../ReactiveCategorySelect";

type Props = {
  token: string;
};

const AddMealForm = async (props: Props) => {
  const allCategories = await fetchCategoriesData(props.token);

  const addMealAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const price = formData.get("price")?.valueOf() as number;
    const image = formData.get("image") as string;
    const categories = formData.getAll("categories") as any[];

    await addMeal(name, description, price, image, categories, props.token);
    redirect("/menu");
  };

  return (
    <form
      id="addMealForm"
      className="flex flex-col justify-start items-start"
      action={addMealAction}
    >
      <div className="flex justify-around">
        <div className="p-5">
          <h2>Nazwa</h2>
          <input
            className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
            type="text"
            name="name"
            required={true}
            placeholder="Nazwa dania"
          />

          <h2>Cena (zł)</h2>
          <input
            className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
            type="number"
            step="0.01"
            name="price"
            required={true}
            placeholder="Cena"
          />

          <h2>Kategorie</h2>
          <ReactiveCategorySelect
            selectedCategories={[]}
            allCategories={allCategories}
          />

          <h2>Opis (opcjonalnie)</h2>
          <textarea
            className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black resize-y"
            name="description"
            form="addMealForm"
            placeholder="Opis dania"
            cols={48}
            rows={5}
          ></textarea>
          <div className="flex flex-row justify-between">
            <button
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
              type="submit"
            >
              Dodaj
            </button>
            <button
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 ml-5"
              type="reset"
            >
              Wyczyść formularz
            </button>
            <Link
              href="/menu"
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 ml-5"
            >
              Anuluj
            </Link>
          </div>
        </div>
        <div>
          <h2>Zdjęcie</h2>

          <ReactiveFileInput initialImage={""} name="image" />
        </div>
      </div>
    </form>
  );
};

export default AddMealForm;
