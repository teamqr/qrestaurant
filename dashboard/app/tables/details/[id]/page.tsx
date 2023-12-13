import TableDetails from "@/components/tables/TableDetails";
import { TableData } from "@/types/TableData";
import { fetchTableData, fetchTablesData } from "@/utils/apiUtils";
import { checkAdminAccess } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const TableDetailsPage = async ({ params }: { params: { id: number } }) => {
  const token: string = await checkAdminAccess();
  const tableData = await fetchTableData(params.id, token);
  const tablesData = await fetchTablesData(token);

  const isIdInList = async (id: number, tables: TableData[]) => {
    return !!tables.find((table: TableData) => table.id == id);
  };

  if (!(await isIdInList(params.id, tablesData))) {
    redirect(`/tables`);
  }

  return (
    <div className="m-5">
      <TableDetails tableData={tableData} />
    </div>
  );
};

export default TableDetailsPage;
