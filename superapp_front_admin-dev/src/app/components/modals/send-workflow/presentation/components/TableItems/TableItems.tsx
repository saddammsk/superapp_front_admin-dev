import { DobleDropDown } from "@/app/components/DobleDropDown";
import ArrowsMove from "@/app/components/icons/arrows-move";
import BlocksIcon from "@/app/components/icons/blocks-icon";
import { CloseIcon } from "@/app/components/icons/close-icon";
import Pencil from "@/app/components/icons/pencil";
import Image from "next/image";
import { FC } from "react";

const TableItems: FC<{
  email: string;
  name: string;
  blocks: any;
  charge: any;
  image: string;
  charges: string[];
  names: string[];
  currentBlock: any;
  staff_id: string;
  setBlocks: any;
  allBlocks: any;
  rol: string;
  setActuallyResponsible: ()=>void
}> = ({
  name,
  email,
  charge,
  image,
  blocks,
  charges,
  names,
  currentBlock,
  staff_id,
  setBlocks,
  rol,
  setActuallyResponsible,
  allBlocks
}) => {
  const defaultName = names.filter((items) => items === name)[0];
  const defaultCharge = "Aprobador";

  return (
    <div className="w-full bg-white p-2 flex rounded-md my-2 px-4">
      <div className="flex gap-4 w-full items-center justify-between">
        <div className="flex gap-4 items-center w-full">
          <ArrowsMove className="w-6 h-6 text-gray-2000" />
          <Image
            src={image || "/img/default-avatar.png"}
            alt="no-img"
            width={20}
            height={20}
            className=" rounded-full"
          />
          <div className="flex flex-col">
            <h5 className="text-sm font-bold">{name}</h5>
            <p className="text-gray-2000 text-xs">{email}</p>
          </div>
        </div>

        <div className="flex gap-2 w-full items-center justify-start overflow-x-auto">
          {blocks.map((item: any, index: number) => {
            return (
              <div
                className="border border-purple-1000 p-2 text-xs rounded-md items-center text-purple-900 flex gap-4 bg-purple-100"
                key={index}
              >
                <BlocksIcon className="w-4 h-4" /> {item.block_key}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 items-center w-1/2">
          <select value={rol}
          onChange={(e)=>{
            let _blocks = [...allBlocks];
                _blocks = _blocks.map((block: any)=>{
                  return {
                    ...block,
                    responsibles: block.responsibles.map((res: any)=>{
                      if(res.staff_id === staff_id){
                        return {
                          ...res,
                          rol: e.target.value
                        }
                      } else {
                        return res
                      }
                    })
                  }
                })
                setBlocks(_blocks);
          }}
            className="h-12 mb-4 bg-white border border-gray-300 text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
              <option value="approver">Aprobador</option>
              <option value="internal_reviewer">Revisor Interno</option>
          </select>
          <div onClick={()=>{
            setActuallyResponsible();
          }} className="cursor-pointer">
          <Pencil className="w-5 h-5 text-gray-2000"  />
          </div>
          <div
            className="flex items-center justify-center h-5/6 cursor-pointer"
            onClick={() => {
              let _blocks = [...allBlocks]
              _blocks = _blocks.map((item)=>{
                return {
                  ...item,
                  responsibles: item.responsibles.filter((res: any)=>res.staff_id !== staff_id)
                }
              })
              setBlocks(_blocks);
            }}
          >
            <CloseIcon className="w-5 h-5 text-gray-2000" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableItems;
