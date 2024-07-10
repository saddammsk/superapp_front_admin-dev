"use client";

import { cn } from "@/utils/utils";

export const InputText = ({
  id,
  label,
  placeholder,
  className,
  value,
  onChange,
  disabled,
  maxLength,
  minLength,
  error
}) => {
  const handleInputChange = (event) => {
    let newValue = event.target.value;

    // Validamos la longitud mínima si se proporciona
    if (minLength !== undefined && newValue.length < minLength) {
      return; // No actualizamos el valor si no cumple con la longitud mínima
    }

    // Validamos la longitud máxima si se proporciona
    if (maxLength !== undefined && newValue.length > maxLength) {
      newValue = newValue.substring(0, maxLength); // Truncamos el valor si excede la longitud máxima
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
        disabled={disabled}
        className={cn(
          "w-full p-3 rounded-md placeholder:text-gray-500 border",
          className
        )}
      />
      <span style={{color:'red'}}>{error}</span>
    </div>
  );
};
