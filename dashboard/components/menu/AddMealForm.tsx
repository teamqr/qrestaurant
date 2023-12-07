import { addMeal } from "@/utils/apiUtils";
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
  };

  return (
    <form
      className="flex flex-col justify-start items-start m-5"
      action={addNewMeal}
    >
      <input
        className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
        type="text"
        name="name"
        required={true}
        placeholder="Nazwa dania"
      />
      <input
        className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
        type="text"
        name="description"
        placeholder="Opis dania (opcjonalnie)"
      />
      <input
        className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
        type="number"
        step="0.01"
        name="price"
        required={true}
        placeholder="Cena"
      />
      <button
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
        type="submit"
      >
        Dodaj
      </button>
    </form>
  );
};

export default AddMealForm;
