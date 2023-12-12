"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const Alert = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  let alertText = "";
  if (error == "tableNumberConflict") {
    alertText = "Ten numer jest już przypisany do innego stolika";
    return (
      <p className="text-white bg-red-700 rounded-md p-2 m-5">{alertText}</p>
    );
  }
  return <></>;
};

export default Alert;
