import Worker from "@/components/restaurant/Worker";
import React from "react";
import { WorkerData } from "@/types/WorkerData";
import { RestaurantData } from "@/types/RestaurantData";
import Link from "next/link";
import Image from "next/image";
import AddWorkerForm from "./AddWorkerForm";

type Props = {
  restaurantData: RestaurantData;
  workersData: WorkerData[];
  token: string;
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
      <h1 className="text-4xl flex flex-col justify-center items-center">
        Zarządzanie restauracją
      </h1>
      <div className="flex flex-row justify-around">
        <div className="p-5 w-max">
          <h2 className="text-2xl py-2">Informacje o restauracji</h2>
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

          {props.restaurantData.image ? (
            <p>
              <span className="font-bold ">Logo restauracji: </span>
              <Image
                className="border-4 border-black my-2"
                src={`${props.restaurantData.image}`}
                width={300}
                height={400}
                alt="Logo restauracji"
              />
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="p-5 w-max">
          <h2 className="text-2xl py-2">Pracownicy</h2>
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
          <AddWorkerForm token={props.token} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
