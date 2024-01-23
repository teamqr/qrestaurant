import { TableData } from "@/types/TableData";
import React from "react";
import Table from "./Table";
import Link from "next/link";
import { Role } from "@/types/Role";

type Props = {
  tablesData: TableData[];
  role: string;
};

const TableManagementPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="flex flex-col justify-center items-center m-5">
        Zarządzanie stolikami
      </h1>
      <table className="w-3/4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer stolika</th>
            <th>Prefix</th>
            <th>Kod</th>
            <th>Szczegóły</th>
            {props.role == Role.ADMIN ? <th>Edytuj</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {props.tablesData ? (
            props.tablesData.map((table: TableData, i: number) => (
              <Table key={i} data={table} role={props.role} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {props.role == Role.ADMIN ? (
        <Link
          className="rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 w-3/4 flex justify-center text-2xl"
          href="/tables/add"
        >
          Dodaj stolik
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableManagementPage;
