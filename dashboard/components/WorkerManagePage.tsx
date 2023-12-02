"use client";
import { WorkerData } from "@/types/WorkerData";
import { deleteWorker } from "@/utils/apiUtils";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  workerId: number;
  token: string | null;
  workers: WorkerData[];
};

function isWorkerInList(id: number, list: WorkerData[]) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return true;
    }
  }
  return false;
}

const WorkerManagePage = (props: Props) => {
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (deleted || !isWorkerInList(props.workerId, props.workers)) {
      redirect("/restaurant");
    }
  }, [deleted]);

  return (
    <div>
      WorkerManagePage
      <p>Worker with id: {props.workerId}</p>
      <button
        onClick={async () => {
          await deleteWorker(props.workerId, props.token);
          setDeleted(true);
          router.prefetch("/restaurant");
        }}
      >
        Usuń pracownika
      </button>
    </div>
  );
};

export default WorkerManagePage;
