import { editRestaurant, fetchRestaurantData } from "@/utils/apiUtils";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import ReactiveInput from "../ReactiveInput";
import Link from "next/link";
import ReactiveFileInput from "../ReactiveFileInput";
import Image from "next/image";

type Props = {
  token: string;
};

const EditRestaurantForm = async (props: Props) => {
  revalidateTag("restaurant");
  const restaurantData = await fetchRestaurantData(props.token);
  let initialName = restaurantData.name;
  let initialImage = restaurantData.image;

  const editRestaurantAction = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    await editRestaurant(name, image, props.token);
    redirect("/restaurant");
  };
  return (
    <div className="m-5 w-min">
      <form
        id="editRestaurantForm"
        className="flex flex-col justify-start items-start m-5"
        action={editRestaurantAction}
      >
        <h2>Nazwa</h2>
        <ReactiveInput
          type="text"
          name="name"
          required={true}
          value={initialName}
          placeholder="Nazwa restauracji"
        />
        <h2>Logo</h2>
        {restaurantData.image ? (
          <Image
            className="border-4 border-black my-2"
            src={`${restaurantData.image}`}
            width={400}
            height={300}
            alt="Aktualne logo restauracji"
          />
        ) : (
          <></>
        )}
        <ReactiveFileInput initialImage={initialImage} name="image" />
        <div className="flex flex-row justify-between">
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
            type="submit"
          >
            Zapisz
          </button>

          <Link
            href="/restaurant"
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500 ml-5"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurantForm;
