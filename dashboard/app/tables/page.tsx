import { Role } from "@/types/Role";
import { TokenData } from "@/types/TokenData";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const TableManagement = async () => {
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData.role;
  if (role != Role.ADMIN) {
    redirect("/");
  }
  return <div>TableManagement</div>;
};

export default TableManagement;
