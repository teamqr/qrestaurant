import { TableData } from "@/types/TableData";
import React from "react";

type Props = {
  data: TableData;
};

const Table = (props: Props) => {
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>{props.data.id}</td>
      <td>{props.data.number}</td>
      <td>{props.data.prefix}</td>
      <td>{props.data.code}</td>
      <td> Szczegóły</td>
      <td> Edytuj</td>
      <td> Usuń</td>
    </tr>
  );
};

export default Table;
