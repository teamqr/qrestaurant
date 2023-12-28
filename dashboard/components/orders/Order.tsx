import { MealData } from "@/types/MealData";
import { OrderData } from "@/types/OrderData";
import { OrderEntry } from "@/types/OrderEntry";
import { OrderStatus } from "@/types/OrderStatus";
import { TableData } from "@/types/TableData";
import { changeOrderState, fetchOrderEntriesByOrderId } from "@/utils/apiUtils";
import React from "react";
import WSConnection from "./WSConnection";

type Props = {
  data: OrderData;
  mealsData: MealData[];
  tablesData: TableData[];
  token: string;
};

const Order = async (props: Props) => {
  const order = props.data;
  const orderEntries: OrderEntry[] = await fetchOrderEntriesByOrderId(
    order.id,
    props.token
  );

  const orderDateTime = new Date(order.orderDate);
  const orderDate = orderDateTime.toLocaleDateString("pl-PL");
  const orderTime = orderDateTime.toLocaleTimeString("pl-PL").substring(0, 5);

  function getMealNameById(id: number) {
    const meal = props.mealsData.find((e) => e.id == id);
    if (meal) {
      return meal.name;
    }
    return null;
  }

  function getTableNumberById(id: number) {
    const table = props.tablesData.find((e) => e.id == id);
    if (table) {
      return table.number;
    }
    return null;
  }

  const changeOrderStateAction = async () => {
    "use server";
    await changeOrderState(
      order.id,
      OrderStatus.COMPLETED,
      new Date(),
      props.token
    );
    console.log("submit");
  };

  return (
    <div className="flex flex-col items-center flex-wrap m-4 p-2 bg-slate-700 rounded-lg w-72 ">
      <h2>Zamówienie #{order.id}</h2>
      <div className="w-full">Stolik #{getTableNumberById(order.tableId)}</div>
      <div className="flex flex-row justify-between w-full">
        <div>{orderTime}</div>
        <div>{orderDate}</div>
      </div>
      <div className="flex flex-col justify-start items-start bg-white text-black rounded-lg w-full px-5 py-1">
        {orderEntries ? (
          orderEntries.map((orderEntry: OrderEntry, i: number) => (
            <p key={i}>
              {orderEntry.amount} x {getMealNameById(orderEntry.mealId)}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
      <form
        className="flex flex-col justify-end mt-auto"
        action={changeOrderStateAction}
      >
        <button
          type="submit"
          className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
        >
          Zakończ realizację
        </button>
      </form>
    </div>
  );
};

export default Order;
