'use client'; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button as FBButton, Modal } from "flowbite-react";
import Cookies from "js-cookie";
import { Navbar } from "./_components/navbar";
import { Header } from "./_components/header";
import { ButtonTask } from "./_components/button-task";
import { ShowTask } from './_components/show-task'
import { useWorkflowStore } from "@/store/WorkflowStore";
import CommentsPopup from "@/app/components/CommentsPopup";
import PreviewPopup from "@/app/components/PreviewPopup";
import { useTheme } from "next-themes";
import { getDecodedToken } from "@/utils/utils";
import { getParticipantsByWfUserBlockId, sendRejectWorkflow, sendNextWorkflowCreate } from "@/services/WorkflowService";
import { Button } from "../../../../../components/buttons/button";
import { Select } from "flowbite-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { get } from '@/services/RestService'


const StatusTask = ({ status, count }) => {
  if (count > 0) {
    return <p className="text-sm text-gray-500 text-center font-semibold">Tienes <span className="text-blue-500">{count} asignaciones</span> en este proceso</p>;
  }
  if (count == 0) {
    return <p className="text-sm text-green-500 text-center font-semibold">Tienes asignaciones completadas</p>;
  }
  return <></>;
}

export default function SignDocument({ params: { lng, workflow_user_id } }) {
  const { workflowByUser, currentWorkflow, currentWorkflowTask, setCurrentTask, currentBlock, getCurrentWorkflowByWorkflowUserId, currentWorkflowTaskIndex, totalWorkflowTasks, nextWorkflowTask, backWorkflowTask, updateCurrentWorkflowTaskStatus } = useWorkflowStore((state) => ({
    currentWorkflow: state.currentWorkflow,
    workflowByUser: state.workflowByUser,
    currentWorkflowTask: state.currentWorkflowTask,
    setCurrentTask: state.setCurrentTask,
    currentBlock: state.currentBlock,
    getCurrentWorkflowByWorkflowUserId: state.getCurrentWorkflowByWorkflowUserId,
    currentWorkflowTaskIndex: state.currentWorkflowTaskIndex,
    totalWorkflowTasks: state.totalWorkflowTasks,
    nextWorkflowTask: state.nextWorkflowTask,
    backWorkflowTask: state.backWorkflowTask,
    updateCurrentWorkflowTaskStatus: state.updateCurrentWorkflowTaskStatus
  }));

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const initialStateModalReject = {
    revision_status: "REJECTED",
    message: "",
    deadline: ""
  }

  const [openComments, setOppenComments] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [assignations, setAssignations] = useState(0)
  const [force, setForce] = useState(false);
  const [user, setUser] = useState(null);
  const [workflow, setWorkflow] = useState("");
  const [workflowElements, setWorkflowElements] = useState([]);
  const [allWorkflow, setAllWorkflow] = useState([]);
  const [loading, setLoading] = useState(false)
  const [ModalReject, setModalReject] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectedData, setRejectedData] = useState(initialStateModalReject);

  const fetchParticipants = async () => {
    if(currentWorkflow){
      setLoading(true);
      let generalResponse = {};
      try {
        // console.log("WF_DATA", currentWorkflow?.data)
        await Promise.all(
          currentWorkflow?.data?.map(async (it) => {
            const response = await getParticipantsByWfUserBlockId(it.id);
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
              const extractedData = response.data.data.map(item => {
                return {
                  ...item.metadata,
                  date_submited: item.date_submited,
                  status: item.status
                }
              });
              generalResponse[it.id] = [...extractedData];
            }
          })
        );
        // console.log("END OF THE LINE")
        let actuallyUser = getDecodedToken();
        let asignations = 0;
        let keys = Object.keys(generalResponse);
        // console.log("Keys", keys)
        keys.map((key) => {
          const element = generalResponse[key];
          element.forEach((it) => {
            if (it.staff_id == actuallyUser.staff_id && ["PENDING", "NOTIFIED"].includes(it.status)) {
              asignations++;
            }
          })
        })
  
        setAssignations(asignations)
  
        // console.log("GENERAL RESPONSEEEE", generalResponse)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      } 
    }
  }

  useEffect(() => {
    const decodedToken = Cookies.get("decodedToken");
    setUser(decodedToken ? JSON.parse(decodedToken) : null);
    return () => {
      console.log("Usuario cargado");
    };
  }, []);

  useEffect(() => {
    fetchParticipants().then((res) => {
      console.log("TERMINOOOOOOOOOOO")
    });
  }, [currentWorkflow])

  useEffect(() => {
    if (!currentWorkflow) {
      getCurrentWorkflowByWorkflowUserId(workflow_user_id, window.location.hash.substring(1))
    } else {
      // console.log(currentWorkflow)
      window.location.hash = currentWorkflowTask?.block_key;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkflowTask])

  //Código de cambio de estado de la información del modal de rechazo
  const handleChangeModalReject = (e, type) => {
    let updatedData = { ...rejectedData, [type]: e.target.value };

    if (type === "revision_status") {
      updatedData.deadline = '';
    }

    setRejectedData(updatedData);
    // console.log(updatedData.deadline);
  };

  //Reinicia el estado del modal de rechazo cuando se cierra
  const handleModalReject = (value) => {
    if(value === true){
      setModalReject(true);
    }else{
      setModalReject(false);
      setRejectedData(initialStateModalReject)
    }
  };

  useEffect(() => {
    setWorkflowElements(workflowByUser);
    const fetchElements = async () => {
      try {
        // setIsLoading(true);
        const [response1] = await Promise.all([
          get(`:40002/workflow/v1/getAll/${user.acc_id}`),
        ]);

        if (response1?.data) {
          setAllWorkflow(response1.data);
        }
      } catch (error) {
        console.error("Error en fetch elements:", error);
      } finally {
        // setIsLoading(false);
      }
    };
    if (user?.acc_id) {
      fetchElements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowByUser, user]);

  const sendDataModalReject = async () => {

    if(rejectedData.message.trim() === ""){
      toast.error("Por favor ingrese un motivo del rechazo")
      setRejectedData({ ...rejectedData, message: "" });
      return;
    }

    if(rejectedData.revision_status === "ToBeCORRECTED" && rejectedData.deadline === ""){
      toast.error("Por favor ingrese una fecha de rechazo")
      setRejectedData({ ...rejectedData, deadline: "" });
      return;
    }

    let deadlineTimestamp;

    if (rejectedData.deadline) {
      deadlineTimestamp= new Date(rejectedData.deadline).getTime() / 1000
    } else {
      const now = new Date();
      now.setSeconds(0, 0);
      deadlineTimestamp = now.getTime() / 1000;
    }

    const sendData = {...rejectedData,message: rejectedData.message.trim(), deadline: deadlineTimestamp}

    try {
      const response = await sendRejectWorkflow(currentWorkflowTask?.id, sendData)
      updateCurrentWorkflowTaskStatus(currentWorkflowTask?.id, "REJECTED", rejectedData.revision_status)

      if(response.status===200){
        toast.success("Rechazado correctamente")
      }else{
        toast.error("Error al rechazar")
      }
      setModalReject(false);
    } catch (error) {
      console.log(error)
      toast.error("Error en el servidor al rechazar")
    }
    setRejectedData(initialStateModalReject)
  }

  const sendNextWorkflowModal = async () => {

    if(workflow === ""){
      toast.error("Por favor ingrese el flujo quie desea lanzar")
      return;
    }

    const sendData = {
      workflow_user_id_source: workflow_user_id,
      emitter_id: user?.staff_id,
      workflow_id: workflow
    }


    try {
      const response = await sendNextWorkflowCreate(sendData);
      if(response.status===200 || response.status===201){
        toast.success("Operacion exitosa correctamente")
        router.push(`/es/admin/history`);
      }else{
        toast.error("Error al lanzar el nuevo flujo")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error en el servidor al lanzar el nuevo flujo")
    }
    // setRejectedData(initialStateModalReject)
  }

  return (
    <section className="p-2 md:p-6">
      <Navbar lng={lng} />
      <Header setOppenComments={() => {
        setOppenComments(true)
      }} deadline ={currentWorkflow?.deadline} users={currentWorkflow?.staff_id} description={currentWorkflow?.description} status={currentWorkflow?.status_flow} last_update_date={currentWorkflow?.date_last_updated} create_date={currentWorkflow?.date_create}/>
      <div className="w-full mt-6">



        <div className="w-full mt-6 flex-wrap lg:flex-nowrap flex relative gap-6">
          <div className="xl:w-3/4 lg:w-2/3 w-full">
            {currentBlock !== null && <ShowTask lng={lng} setPreview={setPreviewAttachment} />}
          </div>
          {/* <div className="max-w-[280px] rounded-md col-span-3"> */}
          <div className="rounded-md xl:w-4/12 lg:w-4/12 mt-[74px]">
            <div className="flex flex-col gap-5 lg:-mt-[74px]">
              {
                /*
                <button className="flex w-full justify-center bg-white text-sm font-medium items-center gap-2 pl-7 pr-6 py-2 h-12 border border-black-1000 rounded-lg">
                <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 13.25H13M10.75 11V15.5M1 14.75V13.25C1 12.4543 1.31607 11.6913 1.87868 11.1287C2.44129 10.5661 3.20435 10.25 4 10.25H7M2.5 4.25C2.5 5.04565 2.81607 5.80871 3.37868 6.37132C3.94129 6.93393 4.70435 7.25 5.5 7.25C6.29565 7.25 7.05871 6.93393 7.62132 6.37132C8.18393 5.80871 8.5 5.04565 8.5 4.25C8.5 3.45435 8.18393 2.69129 7.62132 2.12868C7.05871 1.56607 6.29565 1.25 5.5 1.25C4.70435 1.25 3.94129 1.56607 3.37868 2.12868C2.81607 2.69129 2.5 3.45435 2.5 4.25Z" stroke="#232323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 13.25H13M10.75 11V15.5M1 14.75V13.25C1 12.4543 1.31607 11.6913 1.87868 11.1287C2.44129 10.5661 3.20435 10.25 4 10.25H7M2.5 4.25C2.5 5.04565 2.81607 5.80871 3.37868 6.37132C3.94129 6.93393 4.70435 7.25 5.5 7.25C6.29565 7.25 7.05871 6.93393 7.62132 6.37132C8.18393 5.80871 8.5 5.04565 8.5 4.25C8.5 3.45435 8.18393 2.69129 7.62132 2.12868C7.05871 1.56607 6.29565 1.25 5.5 1.25C4.70435 1.25 3.94129 1.56607 3.37868 2.12868C2.81607 2.69129 2.5 3.45435 2.5 4.25Z" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add Person in Charge
              </button>
                */
              }
              <div className=" w-full border border-gray-1000 rounded-md p-4">
                <div className="border border-gray-1000 rounded-md py-4">
                  <p className=" text-[16px] text-black text-center font-bold mb-2">Lista de Tareas</p>
                  <StatusTask status={"ASSIGNED"} count={assignations} />
                </div>
                <ul className="flex flex-col gap-2">
                  {
                    currentWorkflow?.data.map((item, index) => {
                      return <ButtonTask key={item.id} step={`Paso ${index + 1}`} type={item.block_type} isActive={currentWorkflowTask.id === item.id} responsibles={[...item.responsibles_admin, ...item.responsibles_user]} theme={theme} onClick={() => {
                        setCurrentTask(item)
                      }} current_staff_id={getDecodedToken().staff_id} wf_user_block_id={item.id} task={item.block_label || item.block_key} status={item.status_block} status_block={item.status_block} revisionStatus={item.revision_status} task_id={currentWorkflow?.workflow_user_id} deadline={item.deadline} force={force}
                      />
                    })
                  }
                </ul>

              </div>

              {
                /**
                 * <div className=" w-full border border-gray-1000 rounded-md p-4">
                <p className=" text-xs text-gray-4000 font-medium mb-4">Assigned Responsible</p>
                <ul className="flex flex-col gap-4">
                  <li>
                    <div className="flex gap-3 justify-between items-center">
                      <Image src="/assets/images/assigned-img-1.png" alt="no-img" width={24} height={24} className=" rounded-full" />
                      <div className=" mr-auto">
                        <h4 className=" text-xs font-medium">Danny Suarez</h4>
                        <p className=" text-xs text-gray-4000">Confidentiality Agreement</p>

                      </div>
                      <button>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z" stroke="#232323" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                  </li>

                  <li>
                    <div className="flex gap-3 justify-between items-center">
                      <Image src="/assets/images/assigned-img-2.png" alt="no-img" width={24} height={24} className=" rounded-full" />
                      <div className=" mr-auto">
                        <h4 className=" text-xs font-medium">Anya Tailor Joy</h4>
                        <p className=" text-xs text-gray-4000">Some Document</p>

                      </div>
                      <button>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z" stroke="#232323" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                  </li>

                  <li>
                    <div className="flex gap-3 justify-between items-center">
                      <Image src="/assets/images/assigned-img-2.png" alt="no-img" width={24} height={24} className=" rounded-full" />
                      <div className=" mr-auto">
                        <h4 className=" text-xs font-medium">Anya Tailor Joy</h4>
                        <p className=" text-xs text-gray-4000">Very Other Document</p>

                      </div>
                      <button>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z" stroke="#232323" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                  </li>


                </ul>

              </div>
                 */
              }

              {
                /**
                 * 
                 * <div className=" w-full border border-gray-1000 rounded-md p-4">
                <p className=" text-xs text-gray-4000 font-medium mb-4">Instructions</p>
                <div className=" border flex gap-2 items-center border-gray-1000 rounded-md pl-2 pr-3 py-2.5 mt-2">
                  <button className="p-1"><svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66667 0.166748H1.33333C0.979711 0.166748 0.640573 0.307224 0.390524 0.557272C0.140476 0.807321 0 1.14646 0 1.50008V9.50008C0 9.8537 0.140476 10.1928 0.390524 10.4429C0.640573 10.6929 0.979711 10.8334 1.33333 10.8334H2.66667C3.02029 10.8334 3.35943 10.6929 3.60948 10.4429C3.85952 10.1928 4 9.8537 4 9.50008V1.50008C4 1.14646 3.85952 0.807321 3.60948 0.557272C3.35943 0.307224 3.02029 0.166748 2.66667 0.166748Z" fill="#359765" />
                    <path d="M8 0.166748H6.66667C6.31304 0.166748 5.97391 0.307224 5.72386 0.557272C5.47381 0.807321 5.33333 1.14646 5.33333 1.50008V9.50008C5.33333 9.8537 5.47381 10.1928 5.72386 10.4429C5.97391 10.6929 6.31304 10.8334 6.66667 10.8334H8C8.35362 10.8334 8.69276 10.6929 8.94281 10.4429C9.19286 10.1928 9.33333 9.8537 9.33333 9.50008V1.50008C9.33333 1.14646 9.19286 0.807321 8.94281 0.557272C8.69276 0.307224 8.35362 0.166748 8 0.166748Z" fill="#359765" />
                  </svg>
                  </button>
                  <div className=" bg-gray-3000 w-full h-1 relative">
                    <div className="w-1/3 bg-green-1000 h-full"></div>
                  </div>
                  <div>
                    <p className=" text-gray-2000 text-[10px]">3:32</p>
                  </div>
                </div>
                <p className=" text-xs text-black-3000 leading-5 mt-4">Lorem ipsum dolor sit amet consectetur. Feugiat vitae nulla mattis duis viverra. Turpis commodo aliquet enim at a vitae viverra. </p>
              </div>
                 */
              }


              {
                /**
                 * <div className="flex flex-col gap-3">
                {
                  (currentWorkflowTaskIndex < totalWorkflowTasks-1) && <button  onClick={nextWorkflowTask} className="flex w-full justify-center bg-green-1000 text-white text-sm font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-green-1000 rounded-lg">
                  Next Document
                </button>
                }
                {
                  (currentWorkflowTaskIndex > 0) &&<button onClick={backWorkflowTask} className="flex w-full justify-center bg-white text-black-4000 text-sm font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-gray-5000 rounded-lg">
                  Back Document
                </button>
                }
                <button className="flex w-full justify-center bg-white text-black-4000 text-sm font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-gray-5000 rounded-lg">
                  Ready
                </button>

              </div>
                 */
              }

            </div>
            {
              currentWorkflowTask?.block_type !== "attachment" && 
              <>
                <Button onClick={() => setAcceptModal(true)} className="w-full mt-4 border-green-1000 text-white bg-green-1000">Accept</Button>
                <div className="flex justify-center items-center pl-7 pr-6 py-2 h-12 w-full mt-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Evita que el enlace realice la acción predeterminada de navegación.
                      handleModalReject(true);
                    }}
                    className=" text-red-1000 text-lg font-medium px-2"
                  >Reject</a>

                </div>
                {/* <Button onClick={() => handleModalReject(true)} className="w-full mt-4 border-red-1000 text-red-1000">Reject</Button> */}
              </>
            }
            <Modal show={ModalReject} onClose={() => handleModalReject(false)}>
              <Modal.Header className="capitalize">
                Rechazar Documento
              </Modal.Header>
              <Modal.Body>
                <label
                  htmlFor="block-key"
                  className="block text-lg font-medium text-gray-900 dark:text-white mb-2"
                >
                  Tipos de rechazo:
                </label>
                <div className="flex items-center mb-4">
                  <input
                    id="rechazado-correccion"
                    type="radio"
                    name="tipo-rechazo"
                    value="ToBeCORRECTED"
                    checked={rejectedData.revision_status === "ToBeCORRECTED"}
                    onChange={(e) => handleChangeModalReject(e, "revision_status")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="rechazado-correccion"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rechazado con derecho a corrección
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="rechazado"
                    type="radio"
                    name="tipo-rechazo"
                    value="REJECTED"
                    checked={rejectedData.revision_status === "REJECTED"}
                    onChange={(e) => handleChangeModalReject(e, "revision_status")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="rechazado"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rechazado (Sin derecho a corrección)
                  </label>
                </div>
                {
                  rejectedData.revision_status==="ToBeCORRECTED" && (
                    <div className="grid gap-4 mb-4">
                      <label
                        htmlFor="block-key"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fecha límite:
                      </label>
                      <input
                        type="datetime-local"
                        id="deadline"
                        value={rejectedData.deadline}
                        onChange={(e) => handleChangeModalReject(e, "deadline")}
                        className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  )
                }
                <div className="grid gap-4 mb-4">
                  {/* <label
                    htmlFor="block-key"
                    className="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Estado:
                  </label>
                  <Select
                    id="status"
                    required
                    value={rejectedData.stateTask}
                    onChange={(e) => handleChangeModalReject(e, "deadline")}
                  >
                    <option value="132">Completado</option>
                    <option value="243">Aprobado</option>
                    <option value="321">Aceptado</option>
                    <option value="443">Pendiente</option>
                    <option value="523">Rechazado</option>
                  </Select> */}
                  <label
                    htmlFor="block-key"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Motivo de rechazo
                    <span className="text-red-1000"> *</span>
                  </label>
                  <textarea value={rejectedData.message} onChange={(e)=> handleChangeModalReject(e, "message")} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-between w-full">
                  <FBButton
                    color="gray"
                    onClick={() => handleModalReject(false)}
                    className="font-medium rounded-lg text-sm me-2 mb-2"
                  >
                    Cancelar
                  </FBButton>
                  <FBButton
                    onClick={sendDataModalReject}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Rechazar
                  </FBButton>
                </div>
              </Modal.Footer>
            </Modal>
            
            <Modal show={acceptModal} onClose={() => setAcceptModal(false)}>
              <Modal.Header className="capitalize">
                Aceptar flujos
              </Modal.Header>
              <Modal.Body>
              <Button onClick={() => setAcceptModal(false)} className="w-full mt-4 border-green-1000 text-white bg-green-1000 hidden">Aprobar y terminar</Button>
              <div className="flex mt-4 gap-4 w-full">
              <select
                value={workflow}
                onChange={(e) => {
                  setWorkflow(e.target.value);
                }}
                id="workflow"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Seleccione un Flujo de Trabajo</option>
                {workflowElements.map((data, index) => (
                  <option key={data.id} value={data.id}>
                    {data.key}
                  </option>
                ))}
              </select>
              <Button onClick={() => sendNextWorkflowModal()} className="w-full  border-green-1000 text-white bg-green-1000">Aprobar y continuar proceso</Button>

                
              </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-between w-full">
                  <FBButton
                    color="gray"
                    onClick={() => setAcceptModal(false)}
                    className="font-medium rounded-lg text-sm me-2 mb-2"
                  >
                    Cancelar
                  </FBButton>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
        {/* (revisar) */}

        {/* <div className="w-full border border-gray-1000 rounded-md p-4 mt-6 ">
              <div className=" w-full">
                <div className="flex justify-between items-center w-full">
                <p>Documents to Sign</p>
                <button><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L5 1L9 5" stroke="#4F4F4F" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
                </div>
                {/-* Bottom Slider *-/}
                <div className=" mt-4 ">
                <DocumentSwiper/>
                </div>
              </div>
            </div> */}

      </div>
      {openComments && <CommentsPopup onHide={() => {
        setOppenComments(false)
      }} workflow_user_id={workflow_user_id} />}
      {previewAttachment && <PreviewPopup filePath={previewAttachment.filePath} fileType={previewAttachment.fileType} savedValue={previewAttachment.savedValue} onHide={() => { setPreviewAttachment(null) }} />}
    
    
    </section>
  );
}