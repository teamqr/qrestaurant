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
    const file = e.target.files[0];
    const fileBase64 = await convertToBase64(file);
    setInputValue(fileBase64);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleChange}
      />
      <input
        className="hidden"
        type="text"
        name={props.name}
        value={inputValue}
        readOnly
      />
    </div>
  );
};

export default ReactiveFileInput;
