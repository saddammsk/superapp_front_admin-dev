import ArrowsMove from "@/app/components/icons/arrows-move";
import { DragAndDrop } from "../components/DragAndDrop";
import { Disclaimer } from "../components/disclaimer";
import FileDescription from "@/app/components/icons/file-description";
import { CloseIcon } from "@/app/components/icons/close-icon";
import Pencil from "@/app/components/icons/pencil";
import { useWizard } from "../../repository/store/wizard";
import { DocumentEditor } from "../DocumentEditor";
import {DobleDropDown} from "@/app/components/DobleDropDown"

const StepTwo = () => {

  const { documentList, uploadDocuments, removeDocument, isInEdition, currentEditDocument, editDocument, updateInstructions, finishEdition, updateResponsibles } = useWizard((state) => ({
    documentList: state.documentList,
    uploadDocuments: state.uploadDocuments,
    removeDocument: state.removeDocument,
    isInEdition: state.isInEdition,
    currentEditDocument: state.currentEditDocument,
    editDocument: state.editDocument,
    updateInstructions: state.updateInstructions,
    finishEdition: state.finishEdition,
    updateResponsibles: state.updateResponsibles
  }));


  if(isInEdition){
    return <DocumentEditor instructions={currentEditDocument?.instructions} updateInstructions={(instructions: any)=>updateInstructions(currentEditDocument?.id as string, instructions)} updateResponsibles={(responsibles: any)=>updateResponsibles(currentEditDocument?.id as string, responsibles)} handleClose={()=>{
      finishEdition()
    }} lng="en" filePath={currentEditDocument?.file_path as string} />
  } else {
    return (
      <section className="flex flex-col p-4 w-full">
        {JSON.stringify(currentEditDocument?.responsibles)}
        <Disclaimer
          title={"Seleccionar documento"}
          description={"Añadir los documentos que desea gestionar"}
        />
        <div className="flex justify-center items-center gap-4 w-full mb-6">
            <div className="w-1/2">
            <DragAndDrop handleUpload={(e: FileList)=>uploadDocuments(e)}/>
            </div>
          </div>
        <div className="flex justify-center items-center gap-4 w-full">
          
          <div className="border border-gray-200 p-2 flex flex-col w-full h-64 rounded-md overflow-y-auto gap-2">
            <h5 className="font-bold text-gray-300 py-2">Documentos cargados</h5>
            {
              documentList.map((item, index)=>{
                return <div key={index} className="border border-gray-200 rounded-md p-4 flex gap-4 ">
                <div className="flex gap-4">
                  <ArrowsMove className="w-6 h-full text-gray-400" />
                  <FileDescription className="w-6 text-green-2000" />
                </div>
                <div className="w-full flex">
                  <h5 className="font-bold text-gray-500 w-4/12 flex items-center">{item.fileName}</h5>
                  <div className="flex justify-between w-8/12">
                    <div className="flex gap-2 w-full items-center justify-start overflow-x-auto">
                      {
                        item?.responsibles.map((ite, index)=>{
                          return <div key={index} className="max-w-96"><DobleDropDown names={[`${ite?.firstName} ${ite?.lastName}`]} defaultName={`${ite?.firstName} ${ite?.lastName}`} charges={[
                            "ANALISTA DE CONTRATACIÓN DE TALENTO HUMANO",
                            "ANALISTA SENIOR DE CONTRATACIÓN Y COMPENSACIÓN",
                            "COORDINADORA DE CONTRATACIÓN Y COMPENSACIÓN",
                            "DIRECTOR DE TALENTO HUMANO",
                            "POSTULANTE"
                          ]} defaultCharge="ANALISTA DE CONTRATACIÓN DE TALENTO HUMANO" order={ite.order || 1} setOrder={(order: number)=>{
                            let responsibles = item?.responsibles.map((responsible: any, index: number)=>{
                              if(responsible.staff_id === ite.staff_id){
                                return {
                                  ...responsible,
                                  order: order
                                }
                              } else {
                                return responsible
                              }
                            })
                            updateResponsibles(item.id, responsibles)
                          }}/></div>
                        })
                      }
                    </div>
                  <div className="flex gap-4 items-center w-1/12">
                  <button onClick={()=>editDocument(item.id)}><Pencil className="w-6 h-6 text-green-2000" /></button>
                    <button onClick={()=>removeDocument(item.id)}><CloseIcon className="w-6 h-6" /></button>
                  </div>
                </div>
                </div>
                
              </div>
              })
            }
          </div>
        </div>
      </section>
    );
  }

  
};

export default StepTwo;
