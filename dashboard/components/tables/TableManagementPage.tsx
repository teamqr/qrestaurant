import { TableData } from "@/types/TableData";
import React from "react";
import Table from "./Table";
import Link from "next/link";

type Props = {
  tablesData: TableData[];
};

const TableManagementPage = (props: Props) => {
  return (
    <div className="m-5">
      <h1 className="text-4xl flex flex-col justify-center items-center m-5">
        Zarządzanie stolikami
      </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer stolika</th>
            <th>Prefix</th>
            <th>Kod</th>
            <th>Edytuj</th>
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
      <Link
        className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-max"
        href="/tables/add"
      >
        Dodaj stolik
      </Link>
    </div>
  );
};

export default TableManagementPage;
