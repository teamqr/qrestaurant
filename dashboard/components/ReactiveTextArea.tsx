"use client";
import React, { useState } from "react";

type Props = {
  name: string;
  form: string;
  placeholder: string;
  cols: number;
  rows: number;
  value: any;
};

const ReactiveTextArea = (props: Props) => {
  const [inputValue, setInputValue] = useState(props.value);
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <textarea
      className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black resize-y"
      name={props.name}
      form={props.form}
      placeholder={props.placeholder}
      cols={props.cols}
      rows={props.rows}
      value={inputValue}
      onChange={handleChange}
    ></textarea>
  );
};

export default ReactiveTextArea;
