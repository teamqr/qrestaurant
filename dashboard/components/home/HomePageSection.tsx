import React, { ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

const HomePageSection = (props: Props) => {
  return (
    <div className="flex flex-col justify-between items-center rounded-md ring-1 ring-inset ring-gray-300 p-5 bg-slate-700">
      {props.children}
    </div>
  );
};

export default HomePageSection;
