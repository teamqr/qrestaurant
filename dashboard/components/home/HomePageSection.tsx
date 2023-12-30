import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode[];
};

const HomePageSection = (props: Props) => {
  return (
    <div className="flex flex-col justify-between items-center rounded-md ring-1 ring-inset ring-gray-300 p-5 bg-slate-700 w-80 h-full">
      {props.children}
      <Link
        className="flex flex-row justify-center rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 text-xl w-2/3 "
        href={props.href}
      >
        Przejdź
      </Link>
    </div>
  );
};

export default HomePageSection;
