import { WorkerData } from "@/types/WorkerData";
import Link from "next/link";
import React from "react";

type Props = {
  data: WorkerData;
};

const Worker = (props: Props) => {
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-900">
      <td>#{props.data.id}</td>
      <td>{props.data.email}</td>

      <td>
        <Link
          href={`/restaurant/worker/${props.data.id}`}
          className="block rounded-md border-0 m-2 py-1 px-5 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 "
        >
          Zarządzaj profilem pracownika
        </Link>
      </td>
    </tr>
  );
};

export default Worker;
