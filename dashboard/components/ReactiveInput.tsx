"use client";
import React, { useState } from "react";

type Props = {
  type: string;
  name: string;
  required: boolean;
  value: any;
  step?: string;
  placeholder: string;
};

const ReactiveInput = (props: Props) => {
  const [inputValue, setInputValue] = useState(props.value);

  const handleChange = (e: any) => {
    let value = e.target.value;

    const expression = new RegExp("^([ 0-9]+(.?[0-9]?[0-9]?)?)$");
    if (value == "") {
      setInputValue("");
    } else if (props.type == "number" && !value.match(expression)) {
      return;
    }
    setInputValue(value);
  };

  return (
    <input
      className="block rounded-md border-0 my-1 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 text-black"
      type={props.type}
      name={props.name}
      step={props?.step}
      required={props.required}
      value={inputValue}
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  );
};

export default ReactiveInput;
