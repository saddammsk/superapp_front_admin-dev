import { CloseIcon } from "@/app/components/icons/close-icon";
import Image from "next/image";
import { FC, useState } from "react";

export const UserItem: FC<{ name: string; options: number[], order: number, handleChangeOrder: (e:number) => void, handleRemove: ()=>void, image?: string }> = ({
  name,
  options,
  order,
  handleChangeOrder,
  handleRemove,
  image
}) => {
  const [selectValue, setSelectValue] = useState(0);
  const handleOptionChange = (event: { target: { value: any } }) => {
    const newId = event.target.value;
    // Update your state or perform actions based on the new selected ID
    handleChangeOrder(Number(newId))
  };

  return (
    <div className="flex gap-4 py-[2px]">
      <select
        className="rounded-xl border-none"
        value={order}
        onChange={handleOptionChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="w-full p-2 gap-2 bg-white flex flex-row rounded-xl border-none justify-between items-center">
        <div className="flex gap-4">
          <Image
            src={image || '/img/default-avatar.jpg'}
            alt="no-img"
            width={24}
            height={24}
            className="rounded-full"
          />
          <h5> {name}</h5>
        </div>
        <button onClick={handleRemove}><CloseIcon className="w-4 h-4"/></button>
        
      </div>
    </div>
  );
};
