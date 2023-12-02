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
    <div>
      {props.data.email}

      <Link href={`/restaurant/worker/${props.data.id}`}>
        Zarządzaj profilem pracownika
      </Link>
    </div>
  );
};

export default Worker;
