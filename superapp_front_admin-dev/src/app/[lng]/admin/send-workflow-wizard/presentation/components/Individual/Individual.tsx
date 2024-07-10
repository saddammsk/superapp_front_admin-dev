import { UserItem } from "../UsersItem/UserItem";
import { ModalNewUser } from "../../StepOne/ModalNewUser";
import { useWizard } from "../../../repository/store/wizard";
import { useState } from "react";

const Individual = () => {


  const { searchExternalUserByEmail, individualList, updateOrderInIndividualList, removeItemOfIndividualList } = useWizard((state) => ({
    searchExternalUserByEmail: state.searchExternalUserByEmail,
    individualList: state.individualList,
    updateOrderInIndividualList: state.updateOrderInIndividualList,
    removeItemOfIndividualList: state.removeItemOfIndividualList
  }));

  const [email, setEmail] = useState<string>('');


  return (
    <>
    <section className="flex flex-col gap-4 px-4 w-full max-w-3xl">
      <h5 className="font-bold">Añadir personas manualmente</h5>
      <div className="flex gap-2 w-full ">
        <input
          type="email"
          className="w-full p-4 rounded-md"
          placeholder="Direccion de correo electronico"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button className="bg-green-2000 text-white p-4 rounded-md" onClick={()=>searchExternalUserByEmail(email)}>
          agregar
        </button>
      </div>
      <div className="bg-gray-200 h-80 rounded-xl p-2 overflow-y-auto">
        {individualList.map((items, i) => {
          return (
            <UserItem
              key={i}
              order={items.order as number}
              image={items.image}
              handleChangeOrder={(e: number)=>updateOrderInIndividualList(e, items.id)}
              handleRemove={()=>removeItemOfIndividualList(items.id)}
              name={`${items.firstName} ${items.lastName}`}
              options={individualList.map((user, index) => index + 1)}
            />
          );
        })}
      </div>
    </section>
    <ModalNewUser afterAction={()=>{
      setEmail('')
    }}/>
    </>
  );
};

export default Individual;
