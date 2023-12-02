"use client";
import Worker from "@/components/Worker";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  restaurantName: string;
  workersData: any;
  token: string | null;
};

const RestaurantPage = (props: Props) => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != "ADMIN" || !props.token) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Zarządzanie restauracją</h1>
        <h2 className="text-xl">{props.restaurantName}</h2>
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
