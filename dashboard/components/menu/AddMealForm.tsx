import { addMeal } from "@/utils/apiUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  token: string;
};

const AddMealForm = (props: Props) => {
  const addNewMeal = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const price = formData.get("price")?.valueOf() as number;

    await addMeal(name, description, price, props.token);
    redirect("/menu");
  };

  return (
    <form
      id="addMealForm"
      className="flex flex-col justify-start items-start m-5"
      action={addNewMeal}
    >
      <h2>Nazwa</h2>
      <input
        className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
        type="text"
        name="name"
        required={true}
        placeholder="Nazwa dania"
      />

      <h2>Cena</h2>
      <input
        className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
        type="number"
        step="0.01"
        name="price"
        required={true}
        placeholder="Cena"
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
    </form>
  );
};

export default AddMealForm;
