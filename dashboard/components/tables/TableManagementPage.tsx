import { TableData } from "@/types/TableData";
import React from "react";
import Table from "./Table";

type Props = {
  tablesData: TableData[];
};

const TableManagementPage = (props: Props) => {
  return (
    <div className="m-5">
      <h1 className="text-4xl flex flex-col justify-center items-center">
        Zarządzanie stolikami
      </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer stolika</th>
            <th>Prefix</th>
            <th>Kod</th>
            <th>Szczegóły</th>
            <th>Edytuj</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {props.tablesData ? (
            props.tablesData.map((table: TableData, i: number) => (
              <Table key={i} data={table} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableManagementPage;
