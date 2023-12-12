"use client";
import { TableData } from "@/types/TableData";
import React, { useEffect } from "react";
import { useQRCode } from "next-qrcode";

type Props = {
  tableData: TableData;
};

const TableDetails = (props: Props) => {
  const { Image } = useQRCode();

  const downloadQRCode: any = () => {
    const img = document.getElementsByTagName("img")[0];
    const qrContainer = document.getElementById("qrCodeContainer");

    const a = document.createElement("a");
    a.download = `kodQR-stolik-${props.tableData.number}.png`;
    a.href = img.src;
    a.text = "Pobierz kod QR";
    a.className =
      "block rounded-md border-0 my-4 py-1.5 px-7 bg-white text-black ring-1 ring-inset ring-black hover:ring-2 hover:bg-green-400 flex justify-center";
    if (!qrContainer?.children[2]) {
      qrContainer?.append(a);
    }
  };

  useEffect(() => {
    downloadQRCode();
  }, []);

  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <h2>ID stolika</h2>
        <p>#{props.tableData.id}</p>
        <h2>Numer stolika</h2>
        <p>{props.tableData.number}</p>
        <h2>Kod stolika</h2>
        <p>{props.tableData.code}</p>
      </div>
      <div id="qrCodeContainer" className="color-black">
        <h2>Kod QR</h2>
        <div className="w-48 border-black border-4">
          <Image
            text={props.tableData.code}
            options={{
              type: "image/png",
              quality: 5,
              errorCorrectionLevel: "M",
              margin: 2,
              width: 500,
              color: { dark: "#000", light: "#fff" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TableDetails;
