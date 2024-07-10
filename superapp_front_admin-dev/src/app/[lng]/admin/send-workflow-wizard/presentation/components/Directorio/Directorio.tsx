import { useDirectoryUserStore } from "@/store/DirectoryStore";
import { UserItem } from "../UsersItem/UserItem";
import Select from "react-select";
import { useWizard } from "../../../repository/store/wizard";
const Directorio = () => {
  const { directoryUsers } = useDirectoryUserStore((state) => ({
    directoryUsers: state.directoryUsers,
  }));

  const { directoryList, addItemInDirectoryList, updateOrderInDirectoryList, removeItemOfDirectoryList } = useWizard((state) => ({
    directoryList: state.directoryList,
    addItemInDirectoryList: state.addItemInDirectoryList,
    updateOrderInDirectoryList: state.updateOrderInDirectoryList,
    removeItemOfDirectoryList: state.removeItemOfDirectoryList
  }));

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "50px",
      height: "50px",
      padding: "0px 10px",
      boxShadow: state.isFocused ? null : null,
    }),

  };

  return (
    <section className="flex flex-col gap-4  p-4 w-full max-w-3xl">
      <h5 className="font-bold">Añadir personas desde el directorio</h5>
      <div className="flex gap-2 w-full ">
        <Select
          className="w-full text-black"
          placeholder="Seleccione"
          isClearable
          onChange={(e: any)=>{
            if(e !== null){
              addItemInDirectoryList(directoryUsers.find((item)=>item.staff_id === e.value))
            }
          }}
          options={directoryUsers.map((e)=>{
            return {
              value: e.staff_id || "",
              label: `${e.firstName} ${e.lastName} (${e.email})`,
            };
          })}
          styles={customStyles}
        />
      </div>
      <div className="bg-gray-200 h-80 rounded-xl p-2 overflow-y-auto">
        {directoryList.map((items, i) => {
          return (
            <UserItem
              key={i}
              order={items.order as number}
              handleChangeOrder={(e: number)=>updateOrderInDirectoryList(e, items.id)}
              handleRemove={()=>removeItemOfDirectoryList(items.id)}
              name={`${items.firstName} ${items.lastName}`}
              options={directoryList.map((user, index) => index + 1)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Directorio;
