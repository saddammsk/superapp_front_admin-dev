import { UserItem } from "../UsersItem/UserItem";
import { ArrowUpTray } from "@/app/components/icons/arrow-up-tray";
import { ArrowDownTray } from "@/app/components/icons/arrow-down-tray";
import { useState } from "react";
import Link from "next/link";
//@ts-ignore
import ReactFiles from "react-files";
import { useWizard } from "../../../repository/store/wizard";

const Masivo = () => {

  const { processMassiveFile, massiveList, updateOrderInMassiveList, removeItemOfMassiveList } = useWizard((state) => ({
    processMassiveFile: state.processMassiveFile,
    massiveList: state.massiveList,
    updateOrderInMassiveList: state.updateOrderInMassiveList,
    removeItemOfMassiveList: state.removeItemOfMassiveList
  }));

  return (
    <section className="flex flex-col gap-4 px-4 w-full max-w-3xl">
      <div className="w-full">
        <h5 className="font-bold py-2">Añadir personas manualmente</h5>
        <div className="flex flex-col gap-4  w-full w-max-xl h-full">
          <div className="flex gap-2 w-full ">
          <ReactFiles
                  accepts={[
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                  ]}
                  dragActiveClassName="border-dashed border border-black bg-gray-100"
                  onChange={(e: any) => {
                    processMassiveFile(e[0])
                  }}
                  multiple={false}
                  className="cursor-pointer border border-green-2000 text-green-2000 p-4 rounded-md w-full gap-4 flex justify-center items-center"
                >
              <ArrowUpTray className="w-6 h-6" /> Cargue un documento excel
            </ReactFiles>
            <Link
                  href={process.env.NEXT_PUBLIC_EXCEL_TEMPLATE_URL as string}
                  className="border border-green-2000 text-green-2000 p-4 rounded-md w-full gap-4 flex justify-center items-center"
                  target="_blank"
                >
            <ArrowDownTray className="w-6 h-6" /> Descargar plantilla
            </Link>
          </div>
          <div className="bg-gray-200 h-80 rounded-xl p-2 overflow-y-auto">
            {massiveList.map((items, i) => {
              return (
                <UserItem
                  key={i}
                  order={items.order as number}
                  handleChangeOrder={(e: number)=>updateOrderInMassiveList(e, items.id)}
                  handleRemove={()=>removeItemOfMassiveList(items.id)}
                  name={`${items.firstName} ${items.lastName}`}
                  options={massiveList.map((user, index) => index + 1)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Masivo;
