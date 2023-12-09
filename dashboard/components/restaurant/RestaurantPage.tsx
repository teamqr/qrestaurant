import Worker from "@/components/restaurant/Worker";
import React from "react";
import { WorkerData } from "@/types/WorkerData";
import { RestaurantData } from "@/types/RestaurantData";
import Link from "next/link";

type Props = {
  restaurantData: RestaurantData;
  workersData: WorkerData[];
  token: string | null;
};

const RestaurantPage = (props: Props) => {
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
          className="bg-transparent border-1 text-l"
          type="text"
          name="name"
        />
        <p>
          <span className="font-bold ">Nazwa restauracji: </span>
          {props.restaurantData.name}
        </p>
        <p>
          <span className="font-bold ">Kod restauracji: </span>
          {props.restaurantData.prefix}
        </p>
        <Link
          href={`/restaurant/edit`}
          className="block rounded-md border-0 my-2 py-1 px-5 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max"
        >
          Edytuj dane
        </Link>
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
