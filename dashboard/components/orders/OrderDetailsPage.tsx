import { MealData } from "@/types/MealData";
import { OrderData } from "@/types/OrderData";
import { OrderEntry } from "@/types/OrderEntry";
import { TableData } from "@/types/TableData";
import React from "react";

type Props = {
  orderData: OrderData;
  orderEntries: OrderEntry[];
  tables: TableData[];
  meals: MealData[];
  token: string;
};

const OrderDetailsPage = (props: Props) => {
  const order = props.orderData;
  const orderEntries = props.orderEntries;
  const orderDate = new Date(order.orderDate);
  let orderCompleteDate: Date | null = null;
  if (order.completionDate) {
    orderCompleteDate = new Date(order.completionDate);
  }

  function getMealNameById(id: number) {
    const meal = props.meals.find((e) => e.id == id);
    if (meal) {
      return meal.name;
    }
    return null;
  }

  function getTableNumberById(id: number) {
    const table = props.tables.find((e) => e.id == id);
    if (table) {
      return table.number;
    }
    return null;
  }

  return (
    <div>
      <h1 className="flex justify-center">
        Szczegóły zamówienia #{props.orderData.id}
      </h1>
      <div className="flex flex-row justify-around p-5">
        <div className="flex flex-col gap-3">
          <p className="text-2xl">
            <span className="font-bold">Stolik: </span> #
            {getTableNumberById(order.tableId)}
          </p>
          <p className="text-2xl">
            <span className="font-bold">Cena: </span>
            {order.price.toFixed(2)} zł
          </p>
          <div>
            <h2>Zamówione posiłki:</h2>
            <ul className="text-2xl">
              {orderEntries ? (
                orderEntries.map((entry: OrderEntry, i: number) => (
                  <li key={i}>
                    {entry.amount} x {getMealNameById(entry.mealId)}{" "}
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl">
            <span className="font-bold">Zamówiono: </span>
            {orderDate.toLocaleDateString("pl-PL")}
            {", "}
            {orderDate.toLocaleTimeString("pl-PL").substring(0, 5)}
          </p>
          {orderCompleteDate ? (
            <p className="text-2xl">
              <span className="font-bold">Zrealizowano: </span>
              {orderCompleteDate.toLocaleDateString("pl-PL")}
              {", "}
              {orderCompleteDate.toLocaleTimeString("pl-PL").substring(0, 5)}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
