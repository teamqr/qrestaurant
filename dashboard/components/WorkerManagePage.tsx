"use client";
import { WorkerData } from "@/types/WorkerData";
import { deleteWorker } from "@/utils/apiUtils";
import { useSession } from "next-auth/react";
import { RedirectType, redirect } from "next/navigation";
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
  const { data: session, status } = useSession({
    required: true,
  });

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != "ADMIN" || !props.token) {
    redirect("/");
  }
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    if (deleted || !isWorkerInList(props.workerId, props.workers)) {
      redirect("/restaurant", RedirectType.replace);
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
        }}
      >
        Usuń pracownika
      </button>
    </div>
  );
};

export default WorkerManagePage;
