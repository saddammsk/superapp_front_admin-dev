"use client";

import { cn } from "@/utils/utils";

export const InputNumber = ({
  id,
  label,
  placeholder,
  className,
  value,
  onChange,
  maxValue,
  minValue,
  error,
  disabled
}) => {
  const handleInputChange = (event) => {
    let newValue = event.target.value;

    // Convertimos el valor a un número
    newValue = parseFloat(newValue);

    // Validamos que el valor esté dentro de los rangos indicados
    if (!isNaN(newValue)) {
      if (maxValue !== undefined && newValue > maxValue) {
        newValue = maxValue;
      }
      if (minValue !== undefined && newValue < minValue) {
        newValue = minValue;
      }
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
        type="number"
        className={cn(
          "w-full p-3 rounded-md placeholder:text-gray-500 border",
          className
        )}
        disabled={disabled}
      />
      <span style={{color:'red'}}>{error}</span>
    </div>
  );
};
