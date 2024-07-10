"use client";

import { useMemo } from "react";

import { InputFile } from "@/app/components/inputs/input-file";
import { DownloadFileByKey } from "@/services/FileManagerService";
import DownloadIcon from "@/app/components/icons/download-icon";

export const SelectFile = ({
  title,
  accepts,
  onChange,
  multiple,
  fileSize,
  value,
  error,
  savedValue
}) => {
  const allowedTypes = useMemo(() => {
    let types = [];

    if (accepts.includes("image/png")) {
      types.push("PNG");
    }

    if (accepts.includes("image/jpeg")) {
      types.push("JPEG");
    }

    if (accepts.includes("application/pdf")) {
      types.push("PDF");
    }

    if (accepts.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      types.push("XLSX");
    }

    if (accepts.includes("application/vnd.ms-excel")){
      types.push("XLS");
    }

    if (accepts.includes("application/vnd.openxmlformats-officedocument.presentationml.presentation")) {
      types.push("PPTX");
    }

    if (accepts.includes("application/vnd.ms-powerpoint")) {
      types.push("PPT");
    }

    return types.join(", ");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currentLabel = undefined;

  if(value){
    currentLabel = value.reduce((acc, curr) => acc + (acc ? ', ' : '') + curr.name, '');
  } else {
    if(savedValue?.filePath){
      currentLabel = savedValue.filePath
    } 
  }

  return (
    <>
    <div className="flex items-center w-full gap-3">
      <div className="w-full max-w-[200px]">
        <p className="font-semibold">
          {title}
        </p>
        <p className="text-xs font-light text-gray-400">
          Allowed file type: {allowedTypes}
        </p>
        <p className="text-xs font-light text-gray-400">
          Max Size: {fileSize}
        </p>
      </div>
      <InputFile
        className="w-full"
        accepts={accepts}
        label={currentLabel?.includes("/")?currentLabel.match(/\/([^\/]+)$/)[1]: currentLabel}
        onChange={onChange}
        multiple={multiple}
        fileSize={fileSize}
      />
      {
        (savedValue && !value) && <button
        role="button"
        className="bg-green-200 py-3 px-4 transition hover:bg-green-300 rounded-lg"
        onClick={()=>{DownloadFileByKey(savedValue)}}
      >
        <DownloadIcon />
      </button>
      }
      
    </div>
    <span style={{color:'red'}}>{error}</span>
    </>
  )
}