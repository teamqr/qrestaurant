import { TableData } from "@/types/TableData";
import Link from "next/link";
import React from "react";

type Props = {
  data: TableData;
};

const Table = (props: Props) => {
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>#{props.data.id}</td>
      <td>{props.data.number}</td>
      <td>{props.data.prefix}</td>
      <td>{props.data.code}</td>
      <td>
        <Link
          className="block rounded-md border-0 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500"
          href={`/tables/edit/${props.data.id}`}
        >
          Edytuj
        </Link>
      </td>
    </tr>
  );
};

export default Table;
