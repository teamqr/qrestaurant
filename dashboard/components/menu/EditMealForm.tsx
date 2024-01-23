import { editMeal, fetchCategoriesData, fetchMealData } from "@/utils/apiUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ReactiveInput from "../ReactiveInput";
import { revalidateTag } from "next/cache";
import ReactiveTextArea from "../ReactiveTextArea";
import ReactiveFileInput from "../ReactiveFileInput";
import Image from "next/image";
import ReactiveCategorySelect from "../ReactiveCategorySelect";

type Props = {
  id: number;
  token: string;
};

const EditMealForm = async (props: Props) => {
  revalidateTag("meals");
  const mealData = await fetchMealData(props.id, props.token);
  let initialName = mealData.name;
  let initialDesc = mealData.description;
  let initialPrice = mealData.price;
  let initialImage = mealData.image;
  const selectedCategories = mealData.mealCategoryIds;
  const allCategories = await fetchCategoriesData(props.token);

  const editMealAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;
    const price = formData.get("price")?.valueOf() as number;
    const image = formData.get("image") as string;
    const categories = formData.getAll("categories") as any[];

    await editMeal(
      props.id,
      name,
      description,
      price,
      image,
      categories,
      props.token
    );
    redirect("/menu");
  };

  return (
    <form
      id="editMealForm"
      className="flex flex-col justify-start items-start"
      action={editMealAction}
    >
      <div className="flex justify-around">
        <div className="p-5">
          <h2>Nazwa</h2>
          <ReactiveInput
            type="text"
            name="name"
            required={true}
            value={initialName}
            placeholder="Nazwa dania"
          />

          <h2>Cena (zł)</h2>
          <ReactiveInput
            type="number"
            name="price"
            required={true}
            step="0.01"
            value={initialPrice}
            placeholder="Cena"
          />

          <h2>Kategorie</h2>
          <ReactiveCategorySelect
            allCategories={allCategories}
            selectedCategories={selectedCategories}
          />

          <h2>Opis (opcjonalnie)</h2>
          <ReactiveTextArea
            name="description"
            form="editMealForm"
            placeholder="Opis dania"
            cols={48}
            rows={5}
            value={initialDesc}
          />
          <div className="flex flex-row justify-start">
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
        <div>
          <h2>Zdjęcie</h2>
          {mealData.image ? (
            <Image
              className="border-4 border-black my-5"
              src={`${mealData.image}`}
              width={400}
              height={300}
              alt="Aktualne zdjęcie"
            />
          ) : (
            <></>
          )}
          <ReactiveFileInput initialImage={initialImage} name="image" />
        </div>
      </div>
    </form>
  );
};

export default EditMealForm;
