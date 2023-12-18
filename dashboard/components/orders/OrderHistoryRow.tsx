import { OrderData } from "@/types/OrderData";
import { TableData } from "@/types/TableData";
import Link from "next/link";
import React from "react";

type Props = {
  data: OrderData;
  tablesData: TableData[];
  token: string;
};

const OrderHistoryRow = (props: Props) => {
  const order = props.data;
  const orderDateTime = new Date(order.orderDate);
  const orderDate = orderDateTime.toLocaleDateString("pl-PL");
  const orderTime = orderDateTime.toLocaleTimeString("pl-PL").substring(0, 5);

  let orderCompleteDateTime, orderCompleteDate, orderCompleteTime;
  if (order.completionDate) {
    orderCompleteDateTime = order?.completionDate
      .toLocaleString("pl-PL")
      .split(",");
    orderCompleteDate = orderDateTime.toLocaleDateString("pl-PL");
    orderCompleteTime = orderDateTime
      .toLocaleTimeString("pl-PL")
      .substring(0, 5);
  }

  function getTableNumberById(id: number) {
    const table = props.tablesData.find((e) => e.id == id);
    if (table) {
      return table.number;
    }
    return null;
  }
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>#{order.id}</td>
      <td>#{getTableNumberById(order.tableId)}</td>
      <td>{`${orderDate}, ${orderTime}`}</td>
      <td>{`${orderDate}, ${orderTime}`}</td>
      <td>{order.price.toPrecision(4)}zł</td>
      <td>
        <Link
          href="/"
          className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5"
        >
          Szczegóły
        </Link>
      </td>
      <td>
        <Link
          href="/"
          className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5"
        >
          Cofnij realizację
        </Link>
      </td>
    </tr>
  );
};

export default OrderHistoryRow;
