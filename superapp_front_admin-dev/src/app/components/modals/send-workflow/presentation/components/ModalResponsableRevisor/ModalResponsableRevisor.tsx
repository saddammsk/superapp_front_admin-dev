import { Modal } from "flowbite-react";
import { Disclaimer } from "../Disclaimer";
import { FC, useEffect, useState } from "react";
import { RenderBlockSelectable } from "../../RenderBlockSelectable";
import BlocksIcon from "@/app/components/icons/blocks-icon";

const ModalResponsableRevisor: FC<{
  openModal: any;
  setOpenModal: any;
  blocks: any;
  currentBlock: any;
  responsibles: any;
  currentResponsibles: any;
  setBlocks: any;
  setCurrentBlock: any;
  personal: any;
  setPersonal: any;
  actuallyResponsible: any;
  setActuallyResponsible: any
}> = ({
  openModal,
  setOpenModal,
  blocks,
  currentBlock,
  responsibles,
  currentResponsibles,
  setBlocks,
  setCurrentBlock,
  actuallyResponsible,
  setActuallyResponsible
}) => {
  const [idResponsible, setIdResponsible] = useState("");
  const [valueRol, setValueRol] = useState("");

  useEffect(()=>{
    if(actuallyResponsible){
      setIdResponsible(actuallyResponsible.staff_id)
      setValueRol(actuallyResponsible.rol)
    } else {
      setIdResponsible("")
      setValueRol("")
    }
  }, [actuallyResponsible])

  const handleAddPersonal = () => {
    let _block = blocks.find((item: { id: any }) => currentBlock.id == item.id);
    let index = blocks.findIndex(
      (item: { id: any }) => currentBlock.id == item.id
    );
    let _responsiblesBlock = [..._block.responsibles];
    _responsiblesBlock.push(
      responsibles.find(
        (item: { staff_id: string }) => item.staff_id == idResponsible
      )
    );
    let _blocks = [...blocks];
    _blocks[index].responsibles = _responsiblesBlock;
    setBlocks(_blocks);

    setOpenModal(!openModal);
  };

  const handleSelectResponsable = (currentValue: string) => {
    if (currentValue !== "1") {
      setIdResponsible(currentValue);
    } else {
      setIdResponsible("")
    }
  };

  const validateIfBlockIsInResponsible = (blockId: string) => {
    let exists = false;
    let responsible = currentResponsibles.find((item: any)=>item.staff_id === idResponsible);
    if(responsible){
      responsible.blocks.map((item: any)=>{
        if(item.id === blockId){
          exists = true
        }
      })
    }
    return exists
  }

  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => {setOpenModal(!openModal)
        setActuallyResponsible(null)
      }}
      className="h-full"
    >
      <Modal.Header>Responsables y revisores</Modal.Header>
      <Modal.Body className="h-full font-sans">
        <div className="w-full">
          <Disclaimer
            title="Directorio"
            textTooltip="Aqui se mostraran los responsables asignados por el bloque seleccionado"
          />

          {/*Renderizado de vista de responsables*/}
          <select
            onChange={(e) => handleSelectResponsable(e.target.value)}
            value={idResponsible}
            className="h-12 mb-4 bg-white border border-gray-300 text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="1">Seleccione un responsable</option>
            {responsibles.map((data: any, index: number) => {
              return (
                <option key={index} value={data.staff_id}>
                  {data.firstName} {data.lastName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full">
          <Disclaimer title="Rol" textTooltip="..." />
          <select
            onChange={(e) => {
              setValueRol(e.target.value);
              if(e.target.value){
                let _blocks = [...blocks];
                _blocks = _blocks.map((block: any)=>{
                  return {
                    ...block,
                    responsibles: block.responsibles.map((res: any)=>{
                      if(res.staff_id === idResponsible){
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
              }
            }}
            value={valueRol}
            className="h-12 mb-4 bg-white border border-gray-300 text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            {
              idResponsible && <><option value="1">Asigna un rol</option>
              <option value="approver">Aprobador</option>
              <option value="internal_reviewer">Revisor Interno</option></>
            }
          </select>
        </div>

        <div className="w-full">
          <Disclaimer
            title="Bloques"
            textTooltip="Aqui se veran todos los bloques configurados"
          />
          <div className="border rounded-lg border-gray-12000 mb-[0.5rem] p-4 h-[20rem] h-max-4/5 overflow-y-scroll">
            {
              idResponsible && <div>
                {blocks.map((item: any, index: number) => {
              return (
                <RenderBlockSelectable
                  key={index}
                  id={item.id}
                  isActive={validateIfBlockIsInResponsible(item.id)}
                  blockName={item.block_key}
                  onClick={() => setCurrentBlock(item)}
                  addInBlock={()=>{
                    let currentResponsible = responsibles.find((res: any)=>res.staff_id === idResponsible);
                    let _blocks = [...blocks];
                    let blockIndex = blocks.findIndex((res: any)=>res.id===item.id);
                    _blocks[blockIndex].responsibles = [..._blocks[blockIndex].responsibles, currentResponsible]
                    setBlocks(_blocks)
                  }}
                  removeInBlock={()=>{
                    let _blocks = [...blocks];
                    let blockIndex = blocks.findIndex((res: any)=>res.id===item.id);
                    _blocks[blockIndex].responsibles = _blocks[blockIndex].responsibles.filter((res: any)=>res.staff_id !== idResponsible)
                    setBlocks(_blocks)
                  }}
                  icon={
                    <BlocksIcon className="w-full h-3/5 text-purple-1000" />
                  }
                />
              );
            })}
              </div>
            }
          </div>
        </div>
        <div className="w-full flex justify-center items-center p-12">
          <button
            onClick={() => {
              handleAddPersonal()
              setActuallyResponsible(null)
            }}
            className="bg-green-2000 text-white py-2 px-4 rounded-md w-full"
          >
            Añadir
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalResponsableRevisor;
