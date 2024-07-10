import { Modal } from "flowbite-react";
import { useWizard } from "../../../repository/store/wizard";
import { FC } from "react";

const ModalNewUser: FC<{
  afterAction: ()=>void
}> = ({afterAction}) => {

    const { isEditingNewExternalUser, setIsEditingNewExternalUser, newExternalUser, updateNewExternalUser, addNewExternalUserInIndividualList } = useWizard((state) => ({
        isEditingNewExternalUser: state.isEditingNewExternalUser,
        setIsEditingNewExternalUser: state.setIsEditingNewExternalUser,
        newExternalUser: state.newExternalUser,
        updateNewExternalUser: state.updateNewExternalUser,
        addNewExternalUserInIndividualList: state.addNewExternalUserInIndividualList
      }));

    return <Modal show={isEditingNewExternalUser} onClose={()=>setIsEditingNewExternalUser(false)}>
    <Modal.Header>Datos de contacto</Modal.Header>
    <Modal.Body>
      <div className="w-full">
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="w-full font-semibold">Nombres</label>
            <input placeholder="Nombres" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.firstName} onChange={(e)=>updateNewExternalUser('firstName', e.target.value)}></input>
          </div>
          <div className="w-1/2">
            <label className="w-full font-semibold">Apellidos</label>
            <input placeholder="Apellidos" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.lastName} onChange={(e)=>updateNewExternalUser('lastName', e.target.value)}></input>
          </div>
        </div>
        <div className="w-full mt-4">
          <label className="w-full font-semibold">Teléfono</label>
          <input placeholder="Teléfono" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.phone} onChange={(e)=>updateNewExternalUser('phone', e.target.value)}></input>
        </div>
        <div className="w-full mt-4">
          <label className="w-full font-semibold">N° de identidad</label>
          <input placeholder="Nro de documento de identidad" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.documentID as string} onChange={(e)=>updateNewExternalUser('documentID', e.target.value)}></input>
        </div>
        <div className="w-full mt-4">
          <label className="w-full font-semibold">Email</label>
          <input placeholder="Email" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.email} onChange={(e)=>updateNewExternalUser('email', e.target.value)}></input>
        </div>
        <div className="w-full mt-4">
          <label className="w-full font-semibold">Empresa</label>
          <input placeholder="Empresa" className="mt-2 p-2 rounded-lg border-2 w-full" value={newExternalUser.com_name} onChange={(e)=>updateNewExternalUser('com_name', e.target.value)}></input>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="flex justify-center">
      <button onClick={()=>addNewExternalUserInIndividualList(afterAction)} className="bg-green-2000 text-white p-2 rounded-md w-32">
        Añadir
      </button>
    </Modal.Footer>
  </Modal>
}

export default ModalNewUser;