"use client";
import Worker from "@/components/restaurant/Worker";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { changeRestaurantName } from "@/utils/apiUtils";
import { WorkerData } from "@/types/WorkerData";

type Props = {
  restaurantName: string;
  workersData: any;
  token: string | null;
};

const RestaurantPage = (props: Props) => {
  const [restaurantName, setRestaurantName] = useState(props.restaurantName);
  const token = props.token;

  const router = useRouter();

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

  props.workersData.sort((a: any, b: any) => {
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="m-5">
        <h1 className="text-4xl flex flex-col justify-center items-center">
          Zarządzanie restauracją
        </h1>
        <h1 className="text-2xl py-2">Informacje o restauracji</h1>
        <input
          className="bg-transparent border-0 text-l"
          type="text"
          value={restaurantName}
          name="name"
          onChange={handleChange}
        />
        <button
          className="block rounded-md border-0 my-2 py-1 px-5 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500 "
          onClick={() => {
            changeRestaurantName(restaurantName, token);
            router.refresh();
          }}
        >
          Zmień nazwę
        </button>
      </div>
      <div className="p-5">
        <h1 className="text-2xl py-2">Pracownicy</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Aders email</th>
              <th>Zarządzaj profilem pracownika</th>
            </tr>
          </thead>
          <tbody>
            {props.workersData ? (
              props.workersData.map((worker: WorkerData, i: number) => (
                <Worker key={i} data={worker} />
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantPage;
