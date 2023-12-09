import TableManagementPage from "@/components/tables/TableManagementPage";
import { fetchTablesData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const TableManagement = async () => {
  const token: string = await checkAdminAccess();

  const tablesData = await fetchTablesData(token);
  return (
    <div>
      <TableManagementPage tablesData={tablesData} />
    </div>
  );
};

export default TableManagement;
