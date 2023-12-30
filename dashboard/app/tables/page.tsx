import TableManagementPage from "@/components/tables/TableManagementPage";
import { TableData } from "@/types/TableData";
import { TokenData } from "@/types/TokenData";
import { fetchTablesData } from "@/utils/apiUtils";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";

const TableManagement = async () => {
  const token: string = (await getTokenFromCookies()) as string;
  const tokenData: TokenData = await getTokenData(token);
  const role: string = tokenData?.role;

  const tablesData: TableData[] = await fetchTablesData(token);

  return (
    <div>
      <TableManagementPage tablesData={tablesData} role={role} />
    </div>
  );
};

export default TableManagement;
