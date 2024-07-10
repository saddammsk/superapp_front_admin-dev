"use client";

import ReactFiles from "react-files";
import { cn } from "@/utils/utils";

export const InputFile = ({
  label = "Select file or drag and drop",
  onChange,
  accepts,
  className,
  error,
  multiple,
  fileSize
}) => {
  
  function convertFileSizeToBytes(sizeInput) {
      const size = parseFloat(sizeInput);
      const unit = sizeInput.match(/[A-Za-z]+/)[0].toUpperCase();

      const conversionFactors = {
          B: 1,
          KB: 1024,
          MB: 1024 * 1024,
          GB: 1024 * 1024 * 1024,
          TB: 1024 * 1024 * 1024 * 1024
      };

      if (!conversionFactors.hasOwnProperty(unit)) {
          throw new Error('Unidad de tamaño de archivo no válida: ' + unit);
      }

      const bytes = size * conversionFactors[unit];
      return bytes;
  }
  return (
    <div
      className={cn(className)}
    >
      <div className="border flex items-center justify-between gap5 rounded-lg overflow-hidden">
      <div className="p-3 text-gray-400 text-sm">
          {label}
        </div>
      </div>
      
      <span style={{color:'red'}}>{error}</span>
    </div>
  )
}