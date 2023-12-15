import { getCompleteOrders } from "@/sampleData/sampleOrders";
import { fetchMealsData, fetchTablesData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";
import OrderHistoryRow from "./OrderHistoryRow";
import { OrderData } from "@/types/OrderData";

const OrdersHistoryPage = async () => {
  const token = (await getTokenFromCookies()) as string;
  const tables = await fetchTablesData(token);

  const orders = getCompleteOrders();
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex flex-col justify-center items-center m-5">
        Historia zamówień
      </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stolik</th>
            <th>Data złożenia zamówienia</th>
            <th>Data zrealizowania zamówienia</th>
            <th>Cena</th>
            <th>Szczegóły</th>
            <th>Cofnij realizację</th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order: OrderData, i: number) => (
              <OrderHistoryRow
                key={i}
                data={order}
                tablesData={tables}
                token={token}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersHistoryPage;
