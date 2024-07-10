import { FC, useState } from "react";
import { RenderBlockSelectableProps } from "../../domain/RenderBlockSelectable";
import { Checkbox, Label } from "flowbite-react";
const RenderBlockSelectable: FC<RenderBlockSelectableProps> = ({
  isActive,
  id,
  blockName,
  icon,
  onClick,
  addInBlock,
  removeInBlock
}) => {
  return (
    <div
      className={`border w-full rounded-lg grid grid-cols-10 mb-4 text-gray-2000 cursor-pointer ${
        isActive ? "border-green-2000 " : "border-gray-1000  "
      }`}
      onClick={() => {
        if (isActive){
          removeInBlock()
        } else {
          addInBlock()
        };
      }}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <div className="flex items-center gap-2">
        <Checkbox
          className="text-green-600 rounded-lg bg-white border ring-offset-white border-green-2000 focus:ring-2 focus:ring-white"
          id={id}
          checked={isActive}
        />
        <Label htmlFor={id} className="ml-2 col-span-9 flex items-center">
          {blockName}
        </Label>
      </div>
    </div>
  );
};

export default RenderBlockSelectable;
