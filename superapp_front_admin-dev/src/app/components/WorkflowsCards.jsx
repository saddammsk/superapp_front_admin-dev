'use client'; // This is a client component 👈🏽

import { useState, useEffect } from 'react';
import { Button, Card, Tabs, Accordion, Modal } from 'flowbite-react';
import { HiClipboardList } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { toast } from 'react-toastify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Image from 'next/image';
import Cookies from 'js-cookie';
import {
  Container,
  Button as FAButton,
  lightColors,
  darkColors,
} from 'react-floating-action-button';
import Link from 'next/link';
import { get, post } from '@/services/RestService';
import { ClipLoader } from 'react-spinners';
import { useTemplatesStore } from '@/store/TemplatesStore';
import { useWorkflowStore } from '@/store/WorkflowStore';
import { useDirectoryUserStore } from '@/store/DirectoryStore';
import { useStaffStore } from '@/store/StaffStore';
import { useAppStore } from '@/store/AppStore';
import {
  createBlockTypeAttachment,
  createBlockTypeDocument,
  createBlockTypeForm,
  createBlockTypeStaticContent,
  createWorkflow,
} from '@/services/WorkflowService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function WorkflowsCards() {
  const { search, translations, setTranslations } = useAppStore((state) => ({
    search: state.search,
    translations: state.translations,
    setTranslations: state.setTranslations,
  }));

  const { workflowByUser, setWorkflowByUser, getWorkflowByUser } =
    useWorkflowStore((state) => ({
      workflowByUser: state.workflowByUser,
      setWorkflowByUser: state.setWorkflowByUser,
      getWorkflowByUser: state.getWorkflowByUser,
    }));

  const { directoryUsers, getDirectoryUsers } = useDirectoryUserStore(
    (state) => ({
      directoryUsers: state.directoryUsers,
      getDirectoryUsers: state.getDirectoryUsers,
    })
  );

  const { staffs, getStaffs } = useStaffStore((state) => ({
    staffs: state.staffs,
    getStaffs: state.getStaffs,
  }));

  const animatedComponents = makeAnimated();

  const [elements, setElements] = useState([]);
  const [workflowElements, setWorkflowElements] = useState([]);
  const [allWorkflow, setAllWorkflow] = useState([]);
  const [workflow, setWorkflow] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingModalBlocks, setIsLoadingModalBlocks] = useState(false);
  const [openModalBlocks, setOpenModalBlocks] = useState(false);
  const [error, setError] = useState(null);
  const [isRequired, setIsRequired] = useState(true);

  const [workflowName, setWorkflowName] = useState('');
  const [blockAttachments, setBlockAttachments] = useState([]);
  const [blockDocuments, setBlockDocuments] = useState([]);
  const [blockForm, setBlockForm] = useState([]);
  const [blockNotifications, setBlockNotifications] = useState([]);
  const [blockStaticContent, setBlockStaticContent] = useState([]);

  const renderItemDetail = (item, index) => {
    let badgeColor = 'blue';
    switch (item.type) {
      case 'document':
        badgeColor = 'green';
        break;
      case 'attachment':
        badgeColor = 'yellow';
        break;
      case 'form':
        badgeColor = 'indigo';
        break;
      case 'staticContent':
        badgeColor = 'purple';
        break;
      case 'notification':
        badgeColor = 'pink';
        break;
      default:
        badgeColor = 'blue';
        break;
    }
    let configureUrl = '';
    if (item.type == 'document') {
      configureUrl = `workflows/pdf-innofyre/${item.id}`;
    }
    return (
      <Link
        href={configureUrl}
        key={index}
        id={index}
        className='border rounded-md p-2 flex flex-col gap-2'
      >
        <div className='flex items-center gap-2'>
          <div className=''>
            <span
              className={`bg-${badgeColor}-100 text-${badgeColor}-800 text-xs font-medium  px-2.5 py-2 rounded-md dark:bg-gray-700 dark:text-${badgeColor}-400 border border-${badgeColor}-400`}
            >
              {item.order}
            </span>
          </div>
          <div className='flex-auto'>
            <div className='font-medium'>{item.label || item.block_key}</div>
            <div className='text-slate-700'>Key: {item.block_key}</div>
          </div>
        </div>
      </Link>
    );
  };

  const deleteElement = async (element) => {
    workflow.responsible = workflow.responsible.filter((e) => {
      if (element.staff_id !== e.staff_id) return e;
    });
    setWorkflow({ ...workflow });
    toast.info(`Elemento eliminado, para finzalizar debes guardar los cambios`);
  };

  const setDefaultValue = async () => {
    setWorkflowName('');
  };

  const saveElement = () => {
    createWorkflow(workflowName, workflowName).then((response)=>{
      setWorkflowName("");
      setOpenModal(false)
    })
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      workflow.blocks.all,
      result.source.index,
      result.destination.index
    );

    setWorkflow({ ...workflow, blocks: { ...workflow.blocks, all: items } });
  };

  const updateElement = async () => {
    if (workflow.id) {
      const body = {
        responsibles_user: workflow.responsible
          ? workflow.responsible.map((e, index) => {
              return {
                acc_id: e.acc_id,
                staff_id: e.staff_id,
                email: e.email,
                firstName: e.firstName,
                lastName: e.lastName,
                com_name: e.com_name,
                com_image: e.com_image || '/img/default-avatar.jpg',
                image: e.image || '/img/default-avatar.jpg',
                task: e.task ? e.task : '',
                rol: 'signer',
                order: index + 1,
              };
            })
          : [],
        responsibles_admin: [],
      };
      try {
        setIsLoading(true);
        const { data } = await post(
          `:40002/workflow/v1/responsibles/${workflow.id}`,
          body
        );
        if (data.success) {
          toast.success(`Operación satisfactoria`);
          await Promise.all([
            getWorkflowByUser(
              `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`
            ),
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderBlockDetails = (classNames, view) => {
    return (
      <>
        <Accordion className={`${classNames}`} collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              {translations.workflow_responsible}
            </Accordion.Title>
            <Accordion.Content className='px-4'>
              <div className='flex flex-col gap-4'>
                <div>
                  {/* defaultValue={[options[0], options[1]]} */}
                  {/* <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={options}
                                    onChange={onChange}
                                /> */}
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={groupedOptions}
                    onChange={handleResponsibleChange}
                    formatGroupLabel={formatGroupLabel}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  {workflow?.responsible && (
                    <div className='flex flex-col gap-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                        {workflow.responsible.map((data, index) => (
                          <>
                            <Card
                              key={`${view}-responsible-${data.id}`}
                              id={`${view}-responsible-${index}`}
                              className='relative'
                            >
                              <div className='absolute top-4 right-4'>
                                <button
                                  onClick={() => {
                                    deleteElement(data);
                                  }}
                                  className='bg-transparent border-0 m-0 p-0 hover:bg-transparent !hover:bg-transparent'
                                >
                                  <svg
                                    className='h-5 w-5 text-red-400'
                                    aria-hidden='true'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <rect
                                      x='5'
                                      y='6'
                                      width='10'
                                      height='10'
                                      fill='#fff'
                                      stroke='#b40000'
                                      strokeWidth='2'
                                    ></rect>
                                    <path
                                      d='M3 6H17'
                                      stroke='#b40000'
                                      strokeWidth='2'
                                    ></path>
                                    <path
                                      d='M8 6V4H12V6'
                                      stroke='#6c0404'
                                      strokeWidth='2'
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                              <div className='flex gap-1 items-center'>
                                <div className='flex flex-col gap-2 flex-1'>
                                  <div className='flex items-center'>
                                    <div className='h-full'>
                                      <Image
                                        width={50}
                                        height={50}
                                        src={
                                          data.image
                                            ? data.image
                                            : '/img/default-avatar.jpg'
                                        }
                                        className='rounded-full mr-2'
                                        alt='Rounded avatar'
                                      />
                                    </div>
                                    <div className=''>
                                      <h5 className='font-bold tracking-tight text-gray-900 dark:text-white'>
                                        {data.email}
                                      </h5>
                                      {data.firstName && data.lastName && (
                                        <div className='flex'>
                                          <span className='block capitalize text-left font-semibold text-xs mr-2'>
                                            Fullname:
                                          </span>
                                          <span className='block capitalize text-left font-light text-xs'>
                                            {data.firstName} {data.lastName}
                                          </span>
                                        </div>
                                      )}
                                      {data?.com_name ||
                                        (data?.companyName && (
                                          <div className='flex'>
                                            <span className='block capitalize text-left font-semibold text-xs mr-2'>
                                              Company:{' '}
                                            </span>
                                            <span className='block capitalize text-left font-light text-xs'>
                                              {data.com_name
                                                ? data.com_name
                                                : data.companyName}
                                            </span>
                                          </div>
                                        ))}
                                      {data?.task && (
                                        <div className='flex'>
                                          <span className='block capitalize text-left font-semibold text-xs mr-2'>
                                            Task:{' '}
                                          </span>
                                          <span className='block capitalize text-left font-light text-xs'>
                                            {data.task}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className='flex items-center justify-center w-full'>
                                    <input
                                      className='w-full border rounded p-2 outline-none focus:shadow-outline'
                                      type='text'
                                      placeholder={
                                        data.task ? data.task : 'Task'
                                      }
                                      onChange={(e) => {
                                        handleTaskChange(e, data);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </>
                        ))}
                      </div>
                      <div className='flex justify-end'>
                        <Button
                          className='uppercase bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-2 border border-purple-500 hover:border-transparent rounded flex justify-center w-auto'
                          onClick={() => updateElement()}
                        >
                          <div className='pr-2'>
                            <i className='fa fa-plus'></i>
                          </div>
                          {translations.save}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>{translations.blocks}</Accordion.Title>
            <Accordion.Content className='px-4'>
              <Tabs aria-label='Default tabs' style='default'>
                <Tabs.Item
                  active
                  title={`${translations.all}`}
                  icon={HiClipboardList}
                >
                  <div className='flex flex-col gap-2'>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId='droppable'>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {workflow.blocks.all.map((item, index) => {
                              return (
                                <Draggable
                                  ref={provided.innerRef}
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {renderItemDetail(
                                        item,
                                        `${view}-all-${index}`
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </Tabs.Item>
                <Tabs.Item
                  title={`${translations.by_categories}`}
                  icon={MdDashboard}
                >
                  <Accordion>
                    <Accordion.Panel>
                      <Accordion.Title>
                        {translations.static_content_blocks}
                      </Accordion.Title>
                      <Accordion.Content className='px-4'>
                        <div className='flex flex-col gap-2'>
                          {workflow.blocks.blockStaticContent.map(
                            (item, index) => {
                              return (
                                <>
                                  {renderItemDetail(
                                    item,
                                    `${view}-static-content-${index}`
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                      <Accordion.Title>
                        {translations.document_blocks}
                      </Accordion.Title>
                      <Accordion.Content className='px-4'>
                        <div className='flex flex-col gap-2'>
                          {workflow.blocks.blockDocuments.map((item, index) => {
                            return (
                              <>
                                {renderItemDetail(
                                  item,
                                  `${view}-documents-${index}`
                                )}
                              </>
                            );
                          })}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                      <Accordion.Title>
                        {translations.form_blocks}
                      </Accordion.Title>
                      <Accordion.Content className='px-4'>
                        <div className='flex flex-col gap-2'>
                          {workflow.blocks.blockForm.map((item, index) => {
                            return (
                              <>
                                {renderItemDetail(
                                  item,
                                  `${view}-forms-${index}`
                                )}
                              </>
                            );
                          })}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                      <Accordion.Title>
                        {translations.attachments_blocks}
                      </Accordion.Title>
                      <Accordion.Content className='px-4'>
                        <div className='flex flex-col gap-2'>
                          {workflow.blocks.blockAttachments.map(
                            (item, index) => {
                              return (
                                <>
                                  {renderItemDetail(
                                    item,
                                    `${view}-attachments-${index}`
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                      <Accordion.Title>
                        {translations.notifications_blocks}
                      </Accordion.Title>
                      <Accordion.Content className='px-4'>
                        <div className='flex flex-col gap-2'>
                          {workflow.blocks.blockNotifications.map(
                            (item, index) => {
                              return (
                                <>
                                  {renderItemDetail(
                                    item,
                                    `${view}-notifications-${index}`
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  </Accordion>
                </Tabs.Item>
              </Tabs>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </>
    );
  };

  const selectWorkflow = (data) => {
    data.blocks.all = [...[], ...data.blocks.blockAttachments];
    data.blocks.all = [...data.blocks.all, ...data.blocks.blockDocuments];
    data.blocks.all = [...data.blocks.all, ...data.blocks.blockForm];
    data.blocks.all = [...data.blocks.all, ...data.blocks.blockNotifications];
    data.blocks.all = [...data.blocks.all, ...data.blocks.blockStaticContent];
    data.blocks.all = data.blocks.all.sort((a, b) => a.order - b.order);

    const find = allWorkflow.find((d) => data.id == d.id);
    data.responsible = find?.responsibles?.responsibles_user
      ? find.responsibles.responsibles_user
      : [];

    setWorkflow(workflow && workflow.id == data.id ? null : data);
  };

  function mergeArrays(a, b) {
    const combinedArray = [].concat(a, b);
    let uniqueElements = {};
    combinedArray.forEach((item) => {
      if (!uniqueElements[item.staff_id]) {
        uniqueElements[item.staff_id] = item;
      }
    });
    return Object.values(uniqueElements);
  }

  const handleResponsibleChange = (selectedOptions) => {
    const result = mergeArrays(
      workflow.responsible,
      selectedOptions.map((element) => {
        const externalUser = directoryUsers.find(
          (e) =>
            e.staff_id_subscriber == element.value ||
            e.staff_id == element.value
        );
        const internalUser = staffs.find((s) => s.staff_id == element.value);
        if (externalUser || internalUser) {
          const user = externalUser || internalUser;
          user.task = '';
          return user;
        }
      })
    );
    setWorkflow({
      ...workflow,
      responsible: result,
      reviewers: [],
    });
  };

  const handleTaskChange = (e, data) => {
    workflow.responsible = workflow.responsible.map((r) => {
      return {
        ...r,
        task: r.staff_id == data.staff_id ? e.target.value : r.task,
      };
    });
    setWorkflow(workflow);
  };

  const formatGroupLabel = (data) => (
    <div className='flex justify-between'>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </div>
  );

  const groupedOptions = [
    {
      label: translations.internal_users,
      options: staffs.map((e) => {
        return {
          value: e.staff_id || '',
          label: `${e.firstName} ${e.lastName} (${e.email})`,
        };
      }),
    },
    {
      label: translations.external_users,
      options: directoryUsers.map((e) => {
        return {
          value: e.staff_id_subscriber || e.staff_id || '',
          label: `${e.firstName} ${e.lastName} (${e.email})`,
        };
      }),
    },
  ];

  useEffect(() => {
    setElements(workflowByUser);
    setWorkflowElements(workflowByUser);
  }, [workflowByUser]);

  useEffect(() => {
    if (search.length) {
      setWorkflowElements(
        elements.filter((e) => {
          if (
            (e.name && e.name.toLowerCase().includes(search.toLowerCase())) ||
            (e.key && e.key.toLowerCase().includes(search.toLowerCase()))
          )
            return e;
        })
      );
    } else {
      setWorkflowElements(elements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          getWorkflowByUser(
            `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`
          ),
          getDirectoryUsers(`:40004/admin/v1/directory/${user.acc_id}`),
          getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`),
        ]);

        const [response1] = await Promise.all([
          get(`:40002/workflow/v1/getAll/${user.acc_id}`),
        ]);

        if (response1?.data) {
          setAllWorkflow(response1.data);
        }
      } catch (error) {
        console.error('Error en fetch elements:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.acc_id) {
      fetchElements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const decodedToken = Cookies.get('decodedToken');
    setUser(decodedToken ? JSON.parse(decodedToken) : null);
    setTranslations(translations)
    return () => {
      console.log('WorkflowModal desmontado');
    };
  }, []);

  const [blockTypeForm, setBlockTypeForm] = useState('form');
  const [blockKeyForm, setBlockKeyForm] = useState('');
  const [labelForm, setLabelForm] = useState('');
  const [blockDefaultLanguageForm, setBlockDefaultLanguageForm] = useState('');
  const [blockContentForm, setBlockContentForm] = useState('');
  const [blockOrderForm, setBlockOrderForm] = useState(0);
  const [blockTemplateForm, setBlockTemplateForm] = useState(null);
  const { templates, getTemplates } = useTemplatesStore((state) => ({
    templates: state.templates,
    getTemplates: state.getTemplates,
  }));

  useEffect(() => {
    if (blockTypeForm == 'document') {
      setIsLoadingModalBlocks(true);
      //Load all templates
      const decodedToken = Cookies.get('decodedToken');
      const user = decodedToken ? JSON.parse(decodedToken) : null;
      getTemplates(
        `:40004/admin/v1/template/get-templates-by-accid/${user.acc_id}`,
        () => {
          setIsLoadingModalBlocks(false);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockTypeForm]);

  const saveBlock = () => {
    if (blockTypeForm == 'document') {
      let currentTemplate = templates.find(
        (item) => item.id == blockTemplateForm
      );
      let body = {
        workflow_id: workflow.id,
        template_id: currentTemplate.id,
        template_aws_path: currentTemplate.path_aws.replace(
          'https://saw2024.s3.amazonaws.com/',
          ''
        ),
        block_key: blockKeyForm,
        label: labelForm,
        file_type: 'application/pdf',
        type: 'document',
        instructions: [],
        order: blockOrderForm,
        required: isRequired
      };
      setIsLoadingModalBlocks(true);
      createBlockTypeDocument(body).then((response) => {
        if (response.data.success) {
          getWorkflowByUser(
            `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`,
            () => {
              toast.success(response.data.message);
              setOpenModalBlocks(false);
              setIsLoadingModalBlocks(false);
            }
          );
        }
      });
    }

    if (blockTypeForm == 'attach') {
      setIsLoadingModalBlocks(true);
      createBlockTypeAttachment(workflow.id, blockKeyForm, labelForm, blockOrderForm, isRequired).then(
        (response) => {
          if (response.data.success) {
            getWorkflowByUser(
              `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`,
              () => {
                toast.success(response.data.message);
                setOpenModalBlocks(false);
                setIsLoadingModalBlocks(false);
              }
            );
          }
        }
      );
    }

    if (blockTypeForm == 'staticContent') {
      setIsLoadingModalBlocks(true);
      createBlockTypeStaticContent(
        workflow.id,
        blockKeyForm,
        labelForm,
        blockOrderForm,
        blockDefaultLanguageForm,
        JSON.parse(blockContentForm),
        isRequired
      ).then((response) => {
        if (response.data.success) {
          getWorkflowByUser(
            `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`,
            () => {
              toast.success(response.data.message);
              setOpenModalBlocks(false);
              setIsLoadingModalBlocks(false);
            }
          );
        }
      });
    }

    if (blockTypeForm == 'form') {
      setIsLoadingModalBlocks(true);
      createBlockTypeForm(workflow.id, blockKeyForm, labelForm, blockOrderForm, isRequired).then(
        (response) => {
          if (response.data.success) {
            getWorkflowByUser(
              `:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`,
              () => {
                toast.success(response.data.message);
                setOpenModalBlocks(false);
                setIsLoadingModalBlocks(false);
              }
            );
          }
        }
      );
    }
  };

  return (
    <>
      <div className='py-4 border-b'>
        {workflow && workflow.id && (
          <Container className='!right-px !bottom-px z-10'>
            <FAButton
              styles={{
                backgroundColor: darkColors.purple,
                color: lightColors.white,
              }}
              className='fab-item btn btn-link btn-lg text-white'
              tooltip='Actions'
              icon='fas fa-plus'
              rotate={true}
              onClick={() => setOpenModalBlocks(true)}
            />
          </Container>
        )}
        <span className='block w-full font-bold mb-4'>
          {translations.my_workflows}
        </span>
        <div className='grid gap-4 mb-4 grid-cols-1 md:grid-cols-4'>
          {workflowElements
          .sort((a, b) => {
            console.log(a)
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              else return 0;
          })
          .map((data, index) => {
            return (
              <div
                key={`workflow-${index}`}
                id={`workflow-${index}`}
                className='w-full'
              >
                <Card
                  className={`max-w-sm cursor-pointer ${
                    workflow && workflow.id == data.id ? 'bg-purple-200' : ''
                  }`}
                  onClick={() => {
                    selectWorkflow(data);
                  }}
                >
                  <h5 className='font-bold tracking-tight text-gray-900 dark:text-white uppercase'>
                    {data.name}
                  </h5>
                  {workflow?.blocks?.all && workflow?.id === data.id && (
                    <p className='font-normal text-gray-700 dark:text-gray-400'>
                      {workflow.blocks.all.length} {translations.blocks}
                    </p>
                  )}
                </Card>
                {workflow &&
                  workflow.id == data.id &&
                  renderBlockDetails(
                    'max-w-sm block sm:hidden',
                    `mobile-${workflow.id}-`
                  )}
              </div>
            );
          })}
          <Button
            className='hidden md:block border border bg-transparent hover:bg-purple-700 rounded-md border border-purple-500 md:w-2/4 group'
            onClick={() => setOpenModal(true)}
          >
            <span className='text-purple-500 group-hover:text-white justify-center w-full'>
              <i className='fa fa-plus'></i>
            </span>
          </Button>
          {/* <!-- Bottom-Right Corner --> */}
          <Container className='!right-px !bottom-px z-10 block md:hidden'>
            <FAButton
              styles={{
                backgroundColor: darkColors.purple,
                color: lightColors.white,
              }}
              className='fab-item btn btn-link btn-lg text-white'
              tooltip='Actions'
              icon='fas fa-plus'
              rotate={true}
              onClick={() => setOpenModal(true)}
            />
          </Container>
        </div>
        {workflow &&
          workflow.id &&
          renderBlockDetails(
            'border hidden sm:block',
            `desktop-${workflow.id}-`
          )}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='capitalize'>
          {translations.create}
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className='flex items-center justify-center mb-4'>
              <ClipLoader
                color={'#8049D7'}
                loading={isLoading}
                cssOverride={true}
                size={150}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : (
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className='col-span-2'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  {translations.workflow_name}
                </label>
                <input
                  value={workflowName}
                  onChange={(event) => setWorkflowName(event.target.value)}
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder={`${translations.workflow_name}`}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-between w-full'>
            <Button
              color='gray'
              onClick={() => setOpenModal(false)}
              className=''
            >
              {translations.cancel}
            </Button>
            <Button
              onClick={saveElement}
              className='capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg
                className='me-1 -ms-1 w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {translations.create}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={openModalBlocks} onClose={() => setOpenModalBlocks(false)}>
        <Modal.Header className='capitalize'>
          {translations.create} block in {workflow?.name} Workflow
        </Modal.Header>
        <Modal.Body>
          {isLoadingModalBlocks ? (
            <div className='flex items-center justify-center mb-4'>
              <ClipLoader
                color={'#8049D7'}
                loading={isLoadingModalBlocks}
                cssOverride={true}
                size={150}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : (
            <div className='grid gap-4 mb-4 grid-cols-2'>
              <div className="col-span-2">
                <ul className="ml-0 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full ml-4">
                    <div className="flex items-center pl-3">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        id="horizontal-list-radio-required"
                        type="radio"
                        value={true}
                        name="list-radio-required"
                        checked={isRequired}
                        onChange={(e) => setIsRequired(e.target.checked)}
                      />
                      <label
                        htmlFor="horizontal-list-radio-required"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {translations.required}
                      </label>
                    </div>
                  </li>

                  <li className="w-full dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        id="horizontal-list-radio-optional"
                        type="radio"
                        value={false}
                        name="list-radio-required"
                        checked={!isRequired}
                        onChange={(e) => setIsRequired(!e.target.checked)}
                      />
                      <label
                        htmlFor="horizontal-list-radio-optional"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {translations.optional}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='block-key'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Block Type
                </label>
                <select
                  id='small'
                  name='block-key'
                  onChange={(e) => setBlockTypeForm(e.target.value)}
                  value={blockTypeForm}
                  className='block w-full p-2 pr-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option value={'form'}>Form</option>
                  <option value={'attach'}>Attachment</option>
                  <option value={'staticContent'}>Static Content</option>
                  <option value={'document'}>Document</option>
                </select>
              </div>
              {blockTypeForm == 'document' && (
                <>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-key'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Key
                    </label>
                    <input
                      value={blockKeyForm}
                      onChange={(event) => setBlockKeyForm(event.target.value)}
                      type='text'
                      name='block-key'
                      id='block-key'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Block Key`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='label'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Label
                    </label>
                    <input
                      value={labelForm}
                      onChange={(event) => setLabelForm(event.target.value)}
                      type='text'
                      name='label'
                      id='label'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Label`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-template'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Template
                    </label>
                    <select
                      id='small'
                      name='block-template'
                      onChange={(e) => setBlockTemplateForm(e.target.value)}
                      value={blockTemplateForm}
                      className='block w-full p-2 pr-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                      {templates.map((item, key) => {
                        return (
                          <option value={item.id} key={key}>
                            {item.template_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-order'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Order
                    </label>
                    <input
                      value={blockOrderForm}
                      onChange={(event) =>
                        setBlockOrderForm(event.target.value)
                      }
                      type='number'
                      name='block-order'
                      id='block-order'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Order`}
                    />
                  </div>
                  
                </>
              )}
              {blockTypeForm == 'attach' && (
                <>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-key'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Key
                    </label>
                    <input
                      value={blockKeyForm}
                      onChange={(event) => setBlockKeyForm(event.target.value)}
                      type='text'
                      name='block-key'
                      id='block-key'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Block Key`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='label'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Label
                    </label>
                    <input
                      value={labelForm}
                      onChange={(event) => setLabelForm(event.target.value)}
                      type='text'
                      name='label'
                      id='label'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Label`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-order'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Order
                    </label>
                    <input
                      value={blockOrderForm}
                      onChange={(event) =>
                        setBlockOrderForm(event.target.value)
                      }
                      type='number'
                      name='block-order'
                      id='block-order'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Order`}
                    />
                  </div>
                </>
              )}
              {blockTypeForm == 'staticContent' && (
                <>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-key'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Key
                    </label>
                    <input
                      value={blockKeyForm}
                      onChange={(event) => setBlockKeyForm(event.target.value)}
                      type='text'
                      name='block-key'
                      id='block-key'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Block Key`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='label'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Label
                    </label>
                    <input
                      value={labelForm}
                      onChange={(event) => setLabelForm(event.target.value)}
                      type='text'
                      name='label'
                      id='label'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Label`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-order'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Order
                    </label>
                    <input
                      value={blockOrderForm}
                      onChange={(event) =>
                        setBlockOrderForm(event.target.value)
                      }
                      type='number'
                      name='block-order'
                      id='block-order'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Order`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-default-language'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Default Language
                    </label>
                    <input
                      value={blockDefaultLanguageForm}
                      onChange={(event) =>
                        setBlockDefaultLanguageForm(event.target.value)
                      }
                      type='text'
                      name='block-default-language'
                      id='block-default-language'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Default Language`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-content'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Content
                    </label>
                    <textarea
                      value={blockContentForm}
                      onChange={(event) =>
                        setBlockContentForm(event.target.value)
                      }
                      name='block-content'
                      id='block-content'
                      rows={10}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter the Content`}
                    />
                  </div>
                </>
              )}
              {blockTypeForm == 'form' && (
                <>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-key'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Key
                    </label>
                    <input
                      value={blockKeyForm}
                      onChange={(event) => setBlockKeyForm(event.target.value)}
                      type='text'
                      name='block-key'
                      id='block-key'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Block Key`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='label'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Label
                    </label>
                    <input
                      value={labelForm}
                      onChange={(event) => setLabelForm(event.target.value)}
                      type='text'
                      name='label'
                      id='label'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Label`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='block-order'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Order
                    </label>
                    <input
                      value={blockOrderForm}
                      onChange={(event) =>
                        setBlockOrderForm(event.target.value)
                      }
                      type='number'
                      name='block-order'
                      id='block-order'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder={`Enter a Order`}
                    />
                  </div>
                  
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-between w-full'>
            <Button
              color='gray'
              onClick={() => setOpenModal(false)}
              className=''
            >
              {translations.cancel}
            </Button>
            <Button
              onClick={saveBlock}
              className='capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg
                className='me-1 -ms-1 w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {translations.create}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
