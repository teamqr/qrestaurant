"use client";
import Worker from "@/components/Worker";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { changeRestaurantName } from "@/utils/apiUtils";

type Props = {
  restaurantName: string;
  workersData: any;
  token: string | null;
};

const RestaurantPage = (props: Props) => {
  const [restaurantName, setRestaurantName] = useState(props.restaurantName);
  const token = props.token;

  const { data: session, status } = useSession({
    required: true,
  });

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != "ADMIN" || !props.token) {
    redirect("/");
  }

  const handleChange = async (e: any) => {
    let copy = e.target.value;
    setRestaurantName(copy);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Zarządzanie restauracją</h1>
        <input
          className="bg-transparent border-0 text-xl text-center"
          type="text"
          value={restaurantName}
          name="name"
          onChange={handleChange}
        />
        <button
          className="block rounded-md border-0 my-2 py-1 px-5 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 "
          onClick={() => {
            changeRestaurantName(restaurantName, token);
          }}
        >
          Zmień nazwę
        </button>
      </div>
      <div className="p-5">
        <h1 className="text-3xl">Pracownicy</h1>
        <ul>
          {props.workersData ? (
            props.workersData.map((worker: any, i: number) => (
              <li key={worker.id}>
                <Worker data={worker} token={props.token} />
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantPage;
