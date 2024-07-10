import Image from "next/image";
import { FC } from "react";
import { RenderResponsibleBlockProps } from "../../domain/RenderResponsibleBlock";

const RenderResponsibleBlock: FC<RenderResponsibleBlockProps> = ({
  options,
  image,
  fullname,
  rol,
  staff_id,
  blocks,
  currentBlock,
  setBlocks,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-2">
        <select className="h-5/6 mb-2 bg-white border border-white text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          {options.map((item, index) => {
            return (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>
      <div className="bg-white rounded-lg w-full col-span-10 grid grid-cols-12 h-5/6">
        <div className="flex items-center justify-center col-span-1 h-5/6">
          <div className="flex-shrink-0 w-7 h-7">
            <Image
              className="w-full h-full rounded-full"
              src={image || "/img/default-avatar.jpg"}
              alt="Avatar"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex items-center col-span-6 h-5/6">{fullname}</div>
        <div className="flex items-center justify-center col-span-4">
          <select
            onChange={(e) => {
              let _block: any = blocks.find(
                (element) => currentBlock.id == element.id
              );
              let index = blocks.findIndex(
                (element) => currentBlock.id == element.id
              );
              let _responsiblesBlock = [..._block.responsibles];
              let _currentResponsiblesBlock = _responsiblesBlock.find(
                (element) => element.staff_id == staff_id
              );
              let _currentResponsiblesBlockIndex = _responsiblesBlock.findIndex(
                (element) => element.staff_id == staff_id
              );
              _responsiblesBlock[_currentResponsiblesBlockIndex] = {
                ..._currentResponsiblesBlock,
                rol: e.target.value,
              };
              let _blocks = [...blocks];
              _blocks[index].responsibles = _responsiblesBlock;
              setBlocks(_blocks);
            }}
            value={rol}
            className="mb-2 bg-white border border-none text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="approver">Aprobador</option>
            <option value="internal_reviewer">Revisor Interno</option>
          </select>
        </div>
        <div
          className="flex items-center justify-center h-5/6 cursor-pointer"
          onClick={() => {
            let _block: any = blocks.find((item) => currentBlock.id == item.id);
            let index = blocks.findIndex((item) => currentBlock.id == item.id);
            let _responsiblesBlock = [..._block.responsibles];
            _responsiblesBlock = _responsiblesBlock.filter(
              (element) => element.staff_id !== staff_id
            );
            let _blocks = [...blocks];
            _blocks[index].responsibles = _responsiblesBlock;
            setBlocks(_blocks);
          }}
        >
          <svg
            className="w-full h-3"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7M1 1L7 7"
              stroke="#535353"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RenderResponsibleBlock;
