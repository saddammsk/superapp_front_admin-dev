"use client";

import { useWorkflowStore } from "@/store/WorkflowStore";
import { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "flowbite-react";
import { get, post } from "@/services/RestService";
import Select from "react-select";
import { useStaffStore } from "@/store/StaffStore";
import { useDirectoryUserStore } from "@/store/DirectoryStore";
import { useWorkflowEmissionStore } from "@/store/WorkflowEmissionStore";
import { Step } from "./presentation/components/Steps";
import { Modal } from "flowbite-react";
import Link from "next/link";
import ReactFiles from "react-files";
import axios from "axios";
import { getDecodedToken } from "@/utils/utils";
import { Disclaimer } from "./presentation/components/Disclaimer";
import { steps } from "./application/useCase/steps";
import { generateUID } from "./application/useCase/generateUID";
//import { RenderBlockSelectable } from "./presentation/RenderBlockSelectable";
import { generatedBlocks } from "./application/useCase/generatedBlocks";
import { generateRecipients } from "./application/useCase/generateRecipients";
//import RenderResponsibleBlock from "./presentation/RenderResponsibleBlock/RenderResponsibleBlock";
import { InputHours } from "./presentation/components/InputHours";
import { InputDays } from "./presentation/components/InputDays";
import { generatedData } from "./application/useCase/generated";
import { ModalResponsableRevisor } from "./presentation/components/ModalResponsableRevisor";
import { CurrentStepThree } from "./presentation/CurrentStepThree";
import { CurrentStepTwo } from "./presentation/CurrentStepTwo";
import { CurrentStepOne } from "./presentation/CurrentStepOne";
import { TableItems } from "./presentation/components/TableItems";
import { UsersIcon } from "../../icons/users-icon";
import { ArrowDownTray } from "../../icons/arrow-down-tray";
import PlusIcon from "../../icons/plus-icon";
import { createWorkflowUserV2 } from "./repository/createWorkFlowUserV2";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/UserStore";

export const SendTemplateWorkflow = ({
  lng,
  showModal,
  hideModal,
  fullHide,
}) => {
  const { workflowByUser } = useWorkflowStore((state) => ({
    workflowByUser: state.workflowByUser,
  }));

  const { staffs } = useStaffStore((state) => ({
    staffs: state.staffs,
  }));

  const { directoryUsers } = useDirectoryUserStore((state) => ({
    directoryUsers: state.directoryUsers,
  }));

  const { getWorkflowEmissionsHistory } = useWorkflowEmissionStore((state) => ({
    getWorkflowEmissionsHistory: state.getWorkflowEmissionsHistory,
  }));

  const { userv2 } = useUserStore((state) => ({
    userv2: state.user,
  }));

  const animatedComponents = makeAnimated();
  const [openModal, setOpenModal] = useState(false);
  const [workflow, setWorkflow] = useState("");
  const [workflowElements, setWorkflowElements] = useState([]);
  const [allWorkflow, setAllWorkflow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDay, setDeadlineDay] = useState(1);
  const [deadlineHour, setDeadlineHour] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedRecipientSelect, setSelectedRecipientSelect] = useState(null);
  const [currentResponsibles, setCurrentResponsibles] = useState(null);
  const [actuallyResponsible, setActuallyResponsible] = useState(null)
  const [currentStep, setCurrentStep] = useState(1);

  const resetModal= ()=>{
    setOpenModal(false);
    setWorkflow("");
    setIsLoading(false);
    setName("");
    setDeadlineDay(1);
    setDeadlineHour(0);
    setBlocks([]);
    setCurrentBlock(null);
    setGroups([]);
    setCurrentGroup(null);
    setNewGroupName("");
    setResponsibles([]);
    setSelectedRecipient(null);
    setSelectedRecipientSelect(null);
    setCurrentResponsibles(null);
    setActuallyResponsible(null);
    setCurrentStep(1);
    setDescription("")
  } 

  const router = useRouter();
  const pathname = usePathname();

  const sendWorflow = async () => {
    const gBlocks = generatedBlocks({ blocks });
    const gRecipients = generateRecipients({ groups });
    const generated = generatedData({
      user: {...user, com_image: userv2.com_image},
      workflow,
      deadlineDay,
      deadlineHour,
      name,
      gBlocks,
      gRecipients,
      description
    });
    createWorkflowUserV2({
      fullHide,
      getWorkflowEmissionsHistory,
      user,
      lng,
      generated,
      router,
      pathname,
      resetState: resetModal
    });
  };

  const groupedRecipientOptions = [
    {
      label: "Usuarios Internos",
      options: staffs.map((e) => {
        return {
          value: e.staff_id || "",
          label: `${e.firstName} ${e.lastName} (${e.email})`,
        };
      }),
    },
    {
      label: "Usuarios Externos",
      options: directoryUsers.map((e) => {
        return {
          value: e.staff_id || "",
          label: `${e.firstName} ${e.lastName} (${e.email})`,
        };
      }),
    },
  ];

  useEffect(() => {
    const decodedToken = Cookies.get("decodedToken");
    setUser(decodedToken ? JSON.parse(decodedToken) : null);
    return () => {
      console.log("WorkflowModal desmontado");
    };
  }, []);

  useEffect(() => {
    setWorkflowElements(workflowByUser);
    const fetchElements = async () => {
      try {
        setIsLoading(true);
        const [response1] = await Promise.all([
          get(`:40002/workflow/v1/getAll/${user.acc_id}`),
        ]);

        if (response1?.data) {
          setAllWorkflow(response1.data);
        }
      } catch (error) {
        console.error("Error en fetch elements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.acc_id) {
      fetchElements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowByUser, user]);

  const validateIfResponsibleExists = (responsibles, newItem) => {
    let exists = false;
    responsibles.map((responsible)=>{
      if(responsible.staff_id == newItem.staff_id){
        exists = true;
      }
    })
    return exists
  }

  useEffect(()=>{
    let responsibles = []
    blocks.map((block, blockIndex)=>{
      block.responsibles.map((responsible, responsibleIndex)=>{
        if(validateIfResponsibleExists(responsibles, responsible)){
          let indexOfResponsible = responsibles.findIndex((item)=>item.staff_id == responsible.staff_id)
          responsibles[indexOfResponsible].blocks = [...responsibles[indexOfResponsible].blocks, {...block,
            responsibles: undefined,
            reviewers: undefined}]
        } else {
          responsibles.push({
            ...responsible,
            blocks: [
              {
                ...block,
                responsibles: undefined,
                reviewers: undefined
              }
            ]
          })
        }
      })
    })
    setCurrentResponsibles(responsibles);
  }, [blocks])

  

  const RenderGroupSelectable = ({ isActive, name, onClick }) => {
    return (
      <div
        onClick={() => {
          if (!isActive) onClick();
        }}
        className={`${
          isActive
            ? "bg-green-2000 text-white"
            : "bg-gray-13000 border border-gray-1000 cursor-pointer text-gray-2000"
        } w-full  h-10 rounded-lg grid grid-cols-1 mb-4 `}
      >
        <div className="flex items-center justify-center">{name}</div>
      </div>
    );
  };

  const RenderRecipientsBlock = ({
    fullname,
    image,
    email,
    options,
    order,
    staff_id,
  }) => {
    return (
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <select
            onChange={(e) => {
              let _group = groups.find(
                (element) => currentGroup.id == element.id
              );
              let _index = groups.findIndex(
                (element) => currentGroup.id == element.id
              );
              let _recipientsGroup = [..._group.recipients];
              let _currentRecipientGroup = _recipientsGroup.find(
                (element) => element.staff_id == staff_id
              );
              let _currentRecipientGroupIndex = _recipientsGroup.findIndex(
                (element) => element.staff_id == staff_id
              );
              _recipientsGroup[_currentRecipientGroupIndex] = {
                ..._currentRecipientGroup,
                order: e.target.value,
              };
              let _groups = [...groups];
              _groups[_index].recipients = _recipientsGroup;
              setGroups(_groups);
            }}
            value={order}
            className="h-5/6 mb-2 bg-white border border-white text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            {options.map((item, index) => {
              return (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="bg-white rounded-lg w-full col-span-11 grid grid-cols-12 h-5/6">
          <div className="flex items-center justify-center col-span-1 h-full">
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
          <div className="flex items-center col-span-4 h-full">{fullname}</div>
          <div className="col-span-6 mb-2 flex items-center h-full">
            {email}
          </div>
          <div
            onClick={() => {
              let _group = groups.find((item) => currentGroup.id == item.id);
              let _index = groups.findIndex(
                (item) => currentGroup.id == item.id
              );
              let _recipientsGroup = [..._group.recipients];
              _recipientsGroup = _recipientsGroup.filter(
                (element) => element.staff_id !== staff_id
              );
              let _groups = [...groups];
              _groups[_index].recipients = _recipientsGroup;
              setGroups(_groups);
            }}
            className="flex items-center justify-center h-full cursor-pointer"
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
                strokeLinecap="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const filtrarIdsUnicos = (jsonArray) => {
    // Objeto para almacenar los IDs únicos
    const idsUnicos = {};

    // Array para almacenar los elementos con IDs únicos
    const jsonFiltrado = [];

    // Recorrer el array de JSON
    jsonArray.forEach((item) => {
      const id = item.id;

      // Verificar si el ID ya existe en el objeto de IDs únicos
      if (!idsUnicos[id]) {
        // Si no existe, agregarlo al objeto de IDs únicos y al array filtrado
        idsUnicos[id] = true;
        jsonFiltrado.push(item);
      }
    });

    return jsonFiltrado;
  };

  return (
    <Modal show={showModal} size="8xl" onClose={()=>{
      hideModal()
      resetModal();
      }} className="h-full">
      <Modal.Header>Crear Nuevo Flujo de Trabajo</Modal.Header>
      <Modal.Body className="h-full font-sans">
        <Step steps={steps} currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="h-[22rem]">
            <div className="mx-auto md:w-7/12 w-full mb-6">
              <Disclaimer
                title="Nombre de emisión"
                textTooltip="Ingresa el nombre del flujo a enviar"
              />

              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline mr-2"
                type="text"
                name="name"
                id="name"
                placeholder="Nombre de Emisión"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mx-auto md:w-7/12 w-full mb-6">
              <Disclaimer
                title="Descripción de la emisión"
                textTooltip="Ingresa una descripción para la emisión (opcional)"
              />

              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline mr-2"
                type="text"
                name="description"
                id="description"
                placeholder="Descripción de la emisión"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mx-auto md:w-7/12 w-full mb-6">
              <Disclaimer
                title="Flujo de Trabajo"
                textTooltip="Selecciona el Flujo de Trabajo a usar"
              />

              <select
                value={workflow}
                onChange={(e) => {
                  setWorkflow(e.target.value);
                  let workflow = workflowElements.find(
                    (item) => item.id == e.target.value
                  );
                  const find = allWorkflow.find((d) => workflow.id == d.id);
                  workflow.responsible = find?.responsibles?.responsibles_user
                    ? find.responsibles.responsibles_user
                    : [];
                  let _responsibles = workflow.responsible.map((e) => {
                    return {
                      ...e,
                      value: e.staff_id || "",
                      label: `${e.firstName} ${e.lastName} (${e.email})`,
                      task: e.task,
                      rol: "approver",
                    };
                  });
                  setResponsibles(_responsibles);

                  let _blocks = [];
                  Object.keys(workflow.blocks).map((item) => {
                    _blocks = [..._blocks, ...workflow.blocks[item]];
                  });
                  // ! Limpieza de bloques repetidos
                  _blocks = filtrarIdsUnicos(_blocks);
                  _blocks = _blocks.sort((a, b) => {
                    return a.order - b.order;
                  });
                  _blocks = _blocks.map((item) => {
                    return {
                      ...item,
                      responsibles: _responsibles,
                      reviewers: [],
                    };
                  });
                  setBlocks(_blocks);
                  setCurrentBlock(_blocks[0]);
                }}
                id="workflow"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Seleccione un Flujo de Trabajo</option>
                {workflowElements.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-auto md:w-7/12 w-full gap-x-2">
              <div className="col-span-2">
                <Disclaimer
                  title="Fecha Límite"
                  textTooltip="Establece los dias y las horas maximas para completar el flujo"
                />
              </div>
              <div className="flex gap-4 w-full">
                <InputDays
                  deadlineDay={deadlineDay}
                  setDeadlineDay={setDeadlineDay}
                />

                <InputHours
                  deadlineHour={deadlineHour}
                  setDeadlineHour={setDeadlineHour}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <>
            <div className="flex w-full">
              <div className="flex flex-col gap-4 w-full">
                <Disclaimer
                  title="Responsables y revisores"
                  textTooltip="..."
                />
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-white justify-start text-left items-start text-gray-300 p-[1rem] w-[25rem] border border-gray-400 rounded-md"
                >
                  Responsables / Revisor
                </button>

                <div className="bg-gray-13000 rounded-lg p-4 h-[20rem] overflow-y-scroll">
                  
                {
                  currentResponsibles.map((item, index)=>{
                    return <TableItems
                            key={index}
                    name={`${item.firstName} ${item.lastName}`}
                    email={item.email}
                    image={item.image}
                    charge={item.rol}
                    charges={["Aprobador", "Revisor interno"]}
                    names={[]}
                    rol={item.rol}
                    blocks={item.blocks}
                    allBlocks={blocks}
                    currentBlock={currentBlock}
                    staff_id={item.staff_id}
                    setBlocks={setBlocks}
                    setActuallyResponsible={()=>{
                      setActuallyResponsible(item)
                      setOpenModal(true)
                    }}
                  />
                  })
                }
                </div>

                <ModalResponsableRevisor
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  blocks={blocks}
                  currentBlock={currentBlock}
                  responsibles={responsibles}
                  currentResponsibles={currentResponsibles}
                  setBlocks={setBlocks}
                  setCurrentBlock={setCurrentBlock}
                  actuallyResponsible={actuallyResponsible}
                  setActuallyResponsible={setActuallyResponsible}
                />
              </div>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <div className="grid grid-cols-11 gap-4 ml-4 mr-4 h-[22rem]">
            <div className="col-span-3">
              <Disclaimer
                title="Grupo de destinatarios"
                textTooltip="Aqui se mostraran los grupos de destinatarios creados"
              />

              {/*Renderizado de selector de bloques*/}
              <div className="border rounded-lg border-gray-12000 p-4 h-[20rem] h-max-4/5 overflow-y-scroll">
                {groups.map((item, index) => {
                  return (
                    <RenderGroupSelectable
                      key={index}
                      isActive={item.id == currentGroup?.id}
                      name={item.name}
                      onClick={() => {
                        setCurrentGroup(item);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-span-8">
              <Disclaimer
                title="Nuevo grupo"
                textTooltip="Aqui puedes crear un nuevo grupo de destinatarios"
              />

              <div className="w-full grid grid-cols-12 gap-4 mb-4">
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline mr-2 col-span-6"
                  type="text"
                  name="group-name"
                  id="group-name"
                  placeholder="Nombre de Nuevo Grupo"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />

                <button
                  onClick={() => {
                    let _groups = [...groups];
                    _groups.push({
                      name: newGroupName,
                      id: generateUID(),
                      recipients: [],
                    });
                    if (_groups.length == 1) {
                      setCurrentGroup(_groups[0]);
                    }
                    setNewGroupName("");
                    setGroups(_groups);
                  }}
                  type="button"
                  class="col-span-3 h-full flex gap-4 justify-evently items-center text-green-2000 hover:text-white border border-green-2000 hover:bg-green-2000 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  <PlusIcon className="w-5 h-5 " strokeWidth={2} />{" "}
                  <spam>Añadir Grupo</spam>
                </button>
                <ReactFiles
                  accepts={[
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                  ]}
                  dragActiveClassName="border-dashed border border-black bg-gray-100"
                  onChange={(e) => {
                    let newFile = e[0];
                    let formData = new FormData();
                    formData.append("file", newFile);
                    const decodedToken = getDecodedToken();
                    const accId = decodedToken.acc_id;
                    console.log(newFile);
                    axios
                      .post(
                        `https://super.xertify.co:40004/admin/v1/directory/uploadFile/${accId}`,
                        formData
                      )
                      .then((response) => {
                        let _groups = response.data.data.info_Staffs.map(
                          (item, index) => {
                            return {
                              name: `Grupo ${index + 1}`,
                              id: generateUID(),
                              recipients: [{ ...item, order: 1 }],
                            };
                          }
                        );
                        setGroups(_groups);
                        setCurrentGroup(_groups[0]);
                      });
                  }}
                  multiple={false}
                  className="col-span-2 flex gap-2 justify-center items-center bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-white text-center p-2"
                >
                  <UsersIcon
                    className="w-5 h-5 text-white font-bold"
                    strokeWidth={3}
                  />
                  <button type="button">Cargue masivo</button>
                </ReactFiles>
                <Link
                  href={process.env.NEXT_PUBLIC_EXCEL_TEMPLATE_URL}
                  target="_blank"
                  onClick={() => {}}
                >
                  <button className="flex align-middle bg-green-2000 transition p-4 rounded-lg dark:bg-green-500">
                    <ArrowDownTray
                      className="w-5 h-5 text-white"
                      strokeWidth={3}
                    />
                  </button>
                </Link>
              </div>
              {currentGroup && (
                <div className="bg-gray-13000 flex flex-col gap-2 p-4 h-[16rem] overflow-y-scroll">
                  <div className="grid grid-cols-12 gap-4 border-b py-2">
                    <Select
                      className="w-full col-span-6 rounded-lg"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      value={selectedRecipientSelect}
                      options={groupedRecipientOptions}
                      onChange={(selected, selectedOptions) => {
                        //staff_id
                        setSelectedRecipientSelect(selected);
                        let staff = staffs.find(
                          (item) => item.staff_id == selected.value
                        );
                        let external = directoryUsers.find(
                          (item) => item.staff_id == selected.value
                        );
                        if (staff) {
                          setSelectedRecipient(staff);
                          return;
                        }
                        if (external) {
                          setSelectedRecipient(external);
                          return;
                        }
                        setSelectedRecipient(null);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedRecipient !== null) {
                          let _groupIndex = groups.findIndex(
                            (item) => item.id == currentGroup.id
                          );
                          let _recipients = [...groups[_groupIndex].recipients];
                          _recipients.push({
                            ...selectedRecipient,
                            order: _recipients.length + 1,
                          });
                          let _groups = [...groups];
                          _groups[_groupIndex].recipients = _recipients;
                          setGroups(_groups);
                          setSelectedRecipientSelect(null);
                        }
                      }}
                      className="col-span-2 flex gap-4 justify-evently items-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                    >
                      <PlusIcon className="w-5 h-5 " strokeWidth={2} />{" "}
                      <spam>Añadir</spam>
                    </button>
                  </div>
                  {groups
                    .find((item) => currentGroup.id == item.id)
                    ?.recipients.map((item, index, options) => {
                      return (
                        <RenderRecipientsBlock
                          staff_id={item.staff_id}
                          order={item.order}
                          options={options}
                          key={index}
                          image={item.image}
                          fullname={`${item.firstName} ${item.lastName}`}
                          email={item.email}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full grid grid-cols-2 mt-4">
          {currentStep === 1 && (
            <CurrentStepOne
              hideModal={()=>{
                hideModal()
                resetModal();
                }}
              setCurrentStep={setCurrentStep}
              workflow={workflow}
            />
          )}
          {currentStep === 2 && (
            <CurrentStepTwo
              hideModal={()=>{
                hideModal()
                resetModal();
                }}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 3 && (
            <CurrentStepThree
              sendWorflow={sendWorflow}
              hideModal={()=>{
                hideModal()
                resetModal();
                }}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
