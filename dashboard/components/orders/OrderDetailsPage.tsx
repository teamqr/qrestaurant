import { OrderData } from "@/types/OrderData";
import React from "react";

type Props = {
  orderData: OrderData;
  token: string;
};

const OrderDetailsPage = (props: Props) => {
  const order = props.orderData;
  const orderDate = new Date(order.orderDate);
  let orderCompleteDate: Date | null = null;
  if (order.completionDate) {
    orderCompleteDate = new Date(order.completionDate);
  }

  return (
    <div>
      <h1 className="flex justify-center">
        Szczegóły zamówienia #{props.orderData.id}
      </h1>
      <div className="p-5">
        <h2>Stolik</h2>
        <p>{order.tableId}</p>
        <h2>Cena</h2>
        <p>{order.price.toPrecision(4)} zł</p>
        <h2>Zamówiono</h2>
        <p>
          {orderDate.toLocaleDateString("pl-PL")}
          {", "}
          {orderDate.toLocaleTimeString("pl-PL").substring(0, 5)}
        </p>
        {orderCompleteDate ? (
          <div>
            <h2>Zrealizowano</h2>
            <p>
              {orderCompleteDate.toLocaleDateString("pl-PL")}
              {", "}
              {orderCompleteDate.toLocaleTimeString("pl-PL").substring(0, 5)}
            </p>
          </div>
        ) : (
          <></>
        )}
        <h2>Zamówione posiłki</h2>
        <p></p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
