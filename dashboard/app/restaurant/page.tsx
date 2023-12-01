"use client";

import { WorkerData } from "@/types/WorkerData";
import {
  deleteWorker,
  fetchRestaurantData,
  fetchWorkersData,
} from "@/utils/apiUtils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Worker from "@/components/Worker";
import React, { useEffect, useState } from "react";

const RestaurantManagement = () => {
  const [restaurant, setResturant] = useState();
  const [workers, setWorkers]: any[] = useState();

  async function updateWorkers() {
    const restaurantData = await fetchRestaurantData(token);
    setResturant(restaurantData?.name);
    const workersData = await fetchWorkersData(token);
    setWorkers(workersData);
  }
  const { data: session, status } = useSession({
    required: true,
  });
  const token = session?.user.userToken;

  useEffect(() => {
    updateWorkers();
  }, [session]);

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Zarządzanie restauracją</h1>
        <h2 className="text-xl">{restaurant}</h2>
      </div>
      <div className="p-5">
        <h1 className="text-3xl">Pracownicy</h1>
        <ul>
          {workers ? (
            workers.map((worker: any, i: number) => (
              <li key={worker.id}>
                <Worker data={worker} token={token} />
                <button
                  onClick={() => {
                    deleteWorker(worker.id, token);
                  }}
                >
                  Usuń pracownika
                </button>
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

export default RestaurantManagement;
