"use client";
import { WorkerData } from "@/types/WorkerData";
import React from "react";

type Props = {
  data: WorkerData;
  token?: string;
};

const Worker = (props: Props) => {
  return <div>{props.data.email}</div>;
};

export default Worker;
