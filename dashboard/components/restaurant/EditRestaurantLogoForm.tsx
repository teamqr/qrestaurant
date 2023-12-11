"use client";
import { RestaurantData } from "@/types/RestaurantData";
import { editRestaurant } from "@/utils/apiUtils";
import React, { useState } from "react";

type Props = {
  restaurantData: RestaurantData;
  token: string;
};

const EditRestaurantLogoForm = (props: Props) => {
  const [logo, setLogo] = useState<File | null>(null);

  const convertToBase64 = async (img: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logo) {
      return;
    }
    const logoBase64: string = await convertToBase64(logo as File);
    await editRestaurant(props.restaurantData.name, logoBase64, props.token);
    setLogo(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setLogo(e.target.files[0]);
  };

  return (
    <div>
      <h2 className="text-2xl py-2">Zaktualizuj logo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
        />
        <div className="flex flex-row justify-between w-max">
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500 mr-5"
            type="submit"
          >
            Zapisz
          </button>
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500"
            type="reset"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurantLogoForm;
