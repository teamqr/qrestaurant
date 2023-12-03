import { WorkerData } from "@/types/WorkerData";
import { deleteWorker } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

type Props = {
  data: WorkerData;
  token?: string | null;
};

const Worker = (props: Props) => {
  return (
    <tr className="even:bg-gray-800 odd:bg-gray-900">
      <td>{props.data.id}</td>
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
