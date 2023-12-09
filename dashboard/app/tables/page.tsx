import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const TableManagement = async () => {
  const token: string = await checkAdminAccess();
  return <div>TableManagement</div>;
};

export default TableManagement;
