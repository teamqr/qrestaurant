import WorkerManagePage from "@/components/WorkerManagePage";
import { WorkerData } from "@/types/WorkerData";
import { fetchWorkersData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import React from "react";

const WorkerManage = async ({ params }: { params: { id: number } }) => {
  const token = await getTokenFromCookies();
  const workers: WorkerData[] = await fetchWorkersData(token);
  console.log(workers);

  return (
    <div>
      <WorkerManagePage workerId={params.id} token={token} workers={workers} />
    </div>
  );
};

export default WorkerManage;
