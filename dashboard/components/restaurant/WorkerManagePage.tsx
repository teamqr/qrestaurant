"use client";
import { Role } from "@/types/Role";
import { WorkerData } from "@/types/WorkerData";
import { deleteWorker } from "@/utils/apiUtils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  id: number;

  token: string | null;
  workers: WorkerData[];
};

function extractWorkerData(id: number, list: WorkerData[]) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return list[i];
    }
  }
  return null;
}

const WorkerManagePage = (props: Props) => {
  const [showDialog, setShowDialog] = useState("hidden");
  const [showContent, setShowContent] = useState("visible");

  function showConfirmationDialog() {
    setShowDialog("visible");
    setShowContent("hidden");
  }

  function closeConfirmationDialog() {
    setShowDialog("hidden");
    setShowContent("visible");
  }

  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
  });

  if (status != "authenticated") {
    return <></>;
  }

  if (session?.user.role != Role.ADMIN || !props.token) {
    redirect("/");
  }

  const workerData = extractWorkerData(props.id, props.workers);

  if (workerData) {
    return (
      <div>
        <div className={`${showDialog}`}>
          <div className="m-10">
            <h2>Czy na pewno usunąć pracownika {workerData.email}?</h2>
            <div className="flex flex-row">
              <button
                className="block rounded-md border-0 m-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500"
                onClick={async () => {
                  await deleteWorker(props.id, props.token);
                  router.refresh();
                  router.replace("/restaurant");
                }}
              >
                Usuń
              </button>
              <button
                className="block rounded-md border-0 m-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-green-500"
                onClick={closeConfirmationDialog}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
        <div className={`p-5 pt-0 ${showContent}`}>
          <h1 className="flex flex-col justify-center items-center">
            Zarządzaj kontem pracownika
          </h1>
          <p>ID: {workerData.id}</p>
          <p>e-mail: {workerData.email}</p>
          <button
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-red-500"
            onClick={showConfirmationDialog}
          >
            Usuń konto pracownika
          </button>
          <Link
            href="/restaurant"
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max"
          >
            Anuluj
          </Link>
        </div>
      </div>
    );
  }

  return <></>;
};

export default WorkerManagePage;
