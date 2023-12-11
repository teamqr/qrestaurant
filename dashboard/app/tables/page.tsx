import TableManagementPage from "@/components/tables/TableManagementPage";
import { TableData } from "@/types/TableData";
import { fetchTablesData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import React from "react";

const TableManagement = async () => {
  const token: string = await checkAdminAccess();

  const tablesData: TableData[] = await fetchTablesData(token);
  tablesData.sort((a: TableData, b: TableData) => {
    if (a.number > b.number) {
      return -1;
    } else if (a.id < b.id) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <div>
      <TableManagementPage tablesData={tablesData} />
    </div>
  );
};

export default TableManagement;
