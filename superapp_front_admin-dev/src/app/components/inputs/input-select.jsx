"use client";

import { cn } from "@/utils/utils";
import Select from 'react-select'

export const InputSelect = ({
  id,
  label,
  placeholder,
  className,
  options,
  value,
  onChange,
  multi,
  error,
  disabled
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="font-[500]"
        >
          {label}
        </label>
      )}
      <Select options={options} isDisabled={disabled} onChange={onChange} isMulti={multi} value={value} isClearable placeholder={placeholder} />
      <span style={{color:'red'}}>{error}</span>
    </div>
  )
}