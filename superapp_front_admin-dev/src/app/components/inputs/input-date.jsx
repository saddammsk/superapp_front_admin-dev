"use client";

import { cn } from "@/utils/utils";

export const InputDate = ({
  id,
  label,
  placeholder,
  className,
  value,
  onChange,
  minDate,
  maxDate,
  error,
  disabled
}) => {
  const handleInputChange = (event) => {
    let newValue = event.target.value;

    // Validamos que el nuevo valor esté dentro de los rangos especificados
    if (minDate && newValue < minDate) {
      newValue = minDate;
    }
    if (maxDate && newValue > maxDate) {
      newValue = maxDate;
    }

    // Llamamos a la función onChange con el nuevo valor
    onChange(newValue);
  };

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
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        type="date"
        className={cn(
          "w-full p-3 rounded-md placeholder:text-gray-500 border",
          className
        )}
        min={minDate}
        max={maxDate}
        disabled={disabled}
      />
      <span style={{color:'red'}}>{error}</span>
    </div>
  );
};
