import React from "react";
import OrderHistoryRow from "./OrderHistoryRow";
import { OrderData } from "@/types/OrderData";
import { TableData } from "@/types/TableData";

type Props = {
  orders: OrderData[];
  tables: TableData[];
  token: string;
};

const OrdersHistoryPage = async (props: Props) => {
  const orders = props.orders;

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
                tablesData={props.tables}
                token={props.token}
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
