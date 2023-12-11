"use client";
import React, { useState } from "react";

type Props = {
  name: string;
  initialImage: string;
};

const ReactiveFileInput = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>(props.initialImage);

  const convertToBase64 = async (img: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (img) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onload = () => {
          resolve(fileReader.result as string);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    let value = await convertToBase64(e.target.files[0]);
    setInputValue(value);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <input
        className="text-black hidden"
        type="text"
        name={props.name}
        value={inputValue}
        readOnly
      />
    </div>
  );
};

export default ReactiveFileInput;
