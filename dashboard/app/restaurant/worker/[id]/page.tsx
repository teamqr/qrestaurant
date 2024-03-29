import WorkerManagePage from "@/components/restaurant/WorkerManagePage";
import { WorkerData } from "@/types/WorkerData";
import { fetchWorkersData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

function isWorkerInList(id: number, list: WorkerData[]) {
  if (list.find((worker) => worker.id == id)) {
    return true;
  }
  return false;
}

const WorkerManage = async ({ params }: { params: { id: number } }) => {
  const token = await getTokenFromCookies();
  const workers: WorkerData[] = await fetchWorkersData(token);

  if (!isWorkerInList(params.id, workers)) {
    redirect("/restaurant");
  }

  return (
    <div>
      <WorkerManagePage id={params.id} token={token} workers={workers} />
    </div>
  );
};

export default WorkerManage;
