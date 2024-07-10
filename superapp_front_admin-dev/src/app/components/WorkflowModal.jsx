import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'flowbite-react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Cookies from 'js-cookie'
import { useWorkflowStore } from '@/store/WorkflowStore'
import { useWorkflowEmissionStore } from '@/store/WorkflowEmissionStore'
import { useDirectoryUserStore } from '@/store/DirectoryStore'
import { useStaffStore } from '@/store/StaffStore'
import { get, post } from '@/services/RestService'
import Link from 'next/link'
import { SendTemplateWorkflow } from "@/app/components/modals/send-workflow/SendTemplateWorkflow";

export default function WorkflowModal({ lng, translations }) {
    const {
        directoryUsers,
        getDirectoryUsers
    } = useDirectoryUserStore((state) => ({
        directoryUsers: state.directoryUsers,
        getDirectoryUsers: state.getDirectoryUsers,
    }));

    const {
        staffs,
        getStaffs,
    } = useStaffStore((state) => ({
        staffs: state.staffs,
        getStaffs: state.getStaffs,
    }));

    const {
        workflowByUser,
        setWorkflowByUser,
        getWorkflowByUser
    } = useWorkflowStore((state) => ({
        workflowByUser: state.workflowByUser,
        setWorkflowByUser: state.setWorkflowByUser,
        getWorkflowByUser: state.getWorkflowByUser
    }));

    const {
        getWorkflowEmissionsHistory
    } = useWorkflowEmissionStore((state) => ({
        getWorkflowEmissionsHistory: state.getWorkflowEmissionsHistory
    }));

    const router = useRouter()
    const pathname = usePathname()
    const [workflowElements, setWorkflowElements] = useState([]);
    const [allWorkflow, setAllWorkflow] = useState([]);
    const [directoryElements, setDirectoryElements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [emissionName, setEmissionName] = useState('');
    const [deadlineDay, setDeadlineDay] = useState(1);
    const [deadlineHour, setDeadlineHour] = useState(0);
    const [workflowSelected, setWorkflowSelected] = useState(null);
    const [responsibleSelected, setResponsibleSelected] = useState([]);
    const [recipientSelected, setRecipientSelected] = useState([]);
    const [workflow, setWorkflow] = useState('');
    const [staff, setStaff] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false)

    const animatedComponents = makeAnimated();

    const groupedResponsibleOptions = [
        /* {
            label: translations.responsible,
            options: workflowSelected?.responsible ? workflowSelected.responsible.map(e => {
                return {
                    value: e.staff_id || '',
                    label: e.firstName && e.lastName ?
                        `${e.firstName} ${e.lastName} (${e.email})` :
                        `${e.fullName} (${e.email})`
                }
            }) : []
        } */
        {
            label: translations.internal_users,
            options: staffs.map(e => {
                return {
                    value: e.staff_id || '',
                    label: `${e.firstName} ${e.lastName} (${e.email})`
                }
            })
        },
        {
            label: translations.external_users,
            options: directoryUsers.map(e => {
                return {
                    value: e.staff_id_subscriber || e.staff_id || '',
                    label: `${e.firstName} ${e.lastName} (${e.email})`
                }
            })
        }
    ]

    const groupedRecipientOptions = [
        {
            label: translations.internal_users,
            options: staffs.map(e => {
                return {
                    value: e.staff_id || '',
                    label: `${e.firstName} ${e.lastName} (${e.email})`
                }
            })
        },
        {
            label: translations.external_users,
            options: directoryUsers.map(e => {
                return {
                    value: e.staff_id_subscriber || e.staff_id || '',
                    label: `${e.firstName} ${e.lastName} (${e.email})`
                }
            })
        }
    ]


    useEffect(() => {
        setDirectoryElements(directoryUsers)
    }, [directoryUsers]);

    useEffect(() => {
        setWorkflowElements(workflowByUser)
        const fetchElements = async () => {
            try {
                setIsLoading(true);
                const [response1] = await Promise.all([
                    get(`:40002/workflow/v1/getAll/${user.acc_id}`),
                ]);

                if (response1?.data) {
                    setAllWorkflow(response1.data)
                }
            } catch (error) {
                console.error('Error en fetch elements:', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (user?.acc_id) {
            fetchElements();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workflowByUser]);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                setIsLoading(true);
                await Promise.all([
                    getWorkflowByUser(`:40002/workflow/v1/users/find-wf-by-accid/${user.acc_id}`),
                    getDirectoryUsers(`:40004/admin/v1/directory/${user.acc_id}`),
                    getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`)
                ]);

                const [response1] = await Promise.all([
                    get(`:40002/workflow/v1/getAll/${user.acc_id}`),
                ]);

                if (response1?.data) {
                    setAllWorkflow(response1.data)
                }
            } catch (error) {
                console.error('Error en fetch elements:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (user?.acc_id) {
            fetchElements();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("WorkflowModal desmontado")
        };
    }, []);

    const setDefaultValue = async () => {
        setDeadlineDay(1)
        setDeadlineHour(0)
        setWorkflowSelected(null)
        setResponsibleSelected([])
        setRecipientSelected([])
        setWorkflow('')
        setStaff('')
        setEmissionName('')
    }

    const handleWorkflowSelected = async (event) => {
        setResponsibleSelected([])
        setRecipientSelected([])
        const data = workflowElements.find(e => e.id === event.target.value)
        const find = allWorkflow.find(d => data.id == d.id)
        data.responsible = find?.responsibles?.responsibles_user ? find.responsibles.responsibles_user : []
        setResponsibleSelected(data.responsible.map(e => {
            return {
                ...e,
                value: e.staff_id || '',
                label: `${e.firstName} ${e.lastName} (${e.email})`,
                task: e.task
            }
        }))
        setWorkflowSelected(data)
        setWorkflow(event.target.value)
    }

    const formatGroupLabel = (data) => (
        <div className="flex justify-between">
            <span>{data.label}</span>
            <span>{data.options.length}</span>
        </div>
    )

    const handleResponsibleSelected = (index, selectedOptions) => {
        const find = workflowSelected?.responsible && workflowSelected.responsible.find(e => e.staff_id_subscriber == selectedOptions.value || e.staff_id == selectedOptions.value)
        const updatedResponsibleSelected = [...responsibleSelected];
        updatedResponsibleSelected[index] = find;
        setResponsibleSelected(updatedResponsibleSelected);
    }

    const handleRecipientSelected = (selectedOptions) => {
        const result = selectedOptions.map(element => {
            const recipient = staffs.find(e => e.staff_id_subscriber == element.value || e.staff_id == element.value) ||
                directoryUsers.find(e => e.staff_id_subscriber == element.value || e.staff_id == element.value)
            if (recipient) {
                return recipient
            }
        })
        if (result.length)
            setRecipientSelected(result)
    }

    const saveElement = async () => {
        if (user?.acc_id && workflow) {
            try {
                const body = {
                    "acc_id": user.acc_id,
                    "workflow_id": workflow,
                    "com_name": user?.com_name,
                    "deadline": (deadlineDay * 24) + deadlineHour,
                    "emission_name": emissionName,
                    "responsible": responsibleSelected
                        .filter(e => { if (e) return e })
                        .map((e, index) => {
                            return {
                                acc_id: e.acc_id,
                                staff_id: e.staff_id,
                                email: e.email,
                                firstName: e.firstName,
                                lastName: e.lastName,
                                com_name: e.com_name,
                                com_image: e.com_image || '/img/default-avatar.jpg',
                                image: e.image,
                                order: index+1
                            }
                        }),
                    "reviewers": [],
                    "recipients": recipientSelected.map((e,index) => {
                        return {
                            acc_id: e.acc_id,
                            staff_id: e.staff_id,
                            email: e.email,
                            firstName: e.firstName,
                            lastName: e.lastName,
                            com_name: e.com_name,
                            com_image: e.com_image || '/img/default-avatar.jpg',
                            image: e.image,
                            order: index+1
                        }
                    }),
                }
                const { data } = await post(`:40002/workflow/v1/users/create-wf-user`, body);
                if (data.success) {
                    toast.success(`Operación satisfactoria`)
                    setOpenModal(false)
                    setDefaultValue()
                    if (pathname === `/${lng}/admin/history`) {
                        getWorkflowEmissionsHistory(`:40002/workflow/v1/users/ByAccId?accId=${user.acc_id}`)
                    } else {
                        router.push(`/${lng}/admin/history`)
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            }
        }
    }

    return (
        <>
            <Button
                className="uppercase bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-4 px-4 border border-purple-500 hover:border-transparent rounded w-full flex justify-center"
                onClick={() => setOpenModal(true)}>
                <div className="pr-2">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                {translations.start}
            </Button>
            <Modal size={'5xl'} show={openModal} onClose={() => {
                setDefaultValue()
                setOpenModal(false)
            }}>
                <Modal.Header className="">{translations.send_workflow}</Modal.Header>
                <Modal.Body>{isLoading ? (
                    <div className="flex items-center justify-center mb-4"><ClipLoader
                        color={'#8049D7'}
                        loading={isLoading}
                        cssOverride={true}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>
                ) : (
                    <>

                    <div className="grid gap-4 mb-4 grid-cols-2">
                    <div onClick={()=>{
                        setOpenModal(false)
                        setShowModal(true)
                    }} className="cursor-pointer w-full block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{translations.send_workflow_template}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{translations.send_workflow_previously_configured}</p>
                    </div>

                    <Link href={`/${lng}/admin/send-workflow-wizard`} onClick={()=>setOpenModal(false)} className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{translations.send_new_workflow}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{translations.send_new_workflow_with_assistant}</p>
                    </Link>
                        {/**
                         * <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.emission_name}</label>
                            <input
                                value={emissionName}
                                onChange={(event) => setEmissionName(event.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.emission_name}`} />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="workflow" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.workflow}</label>
                            <select
                                value={workflow}
                                onChange={handleWorkflowSelected}
                                id="workflow"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>{translations.select} {translations.workflow}</option>
                                {
                                    workflowElements.map((data, index) => (
                                        (<option key={index} value={data.id}>
                                            {data.key}
                                        </option>)
                                    ))
                                }
                            </select>
                        </div>
                        {
                            workflowSelected && (
                                <>
                                    {
                                        workflowSelected?.responsible && (
                                            workflowSelected.responsible.map((data, index) => {
                                                return (<div key={index} className="col-span-2" >
                                                    <label htmlFor="responsible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        {translations.responsible}
                                                        {
                                                            responsibleSelected.length && responsibleSelected[index]?.task ?
                                                                ` (${responsibleSelected[index].task})` : ``
                                                        }
                                                    </label>
                                                    <Select
                                                        className='w-full'
                                                        closeMenuOnSelect={true}
                                                        defaultValue={responsibleSelected[index]}
                                                        components={animatedComponents}
                                                        options={groupedResponsibleOptions}
                                                        onChange={(event) => { handleResponsibleSelected(index, event) }}
                                                        formatGroupLabel={formatGroupLabel}
                                                    />
                                                </div>)
                                            })
                                        )
                                    }

                                    <div className="col-span-2">
                                        <label htmlFor="recipient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.recipient}</label>
                                        <Select
                                            className='w-full'
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={groupedRecipientOptions}
                                            onChange={handleRecipientSelected}
                                            formatGroupLabel={formatGroupLabel}
                                        />
                                    </div>
                                </>
                            )
                        }

                        <div className="col-span-2">
                            <label htmlFor="recipient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.deadline}</label>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="deadline-day">
                                        {translations.days}
                                    </label>
                                    <input
                                        id="deadline-day"
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={deadlineDay}
                                        onChange={(e) => setDeadlineDay(e.target.value ? parseInt(e.target.value) : 0)}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="deadline-hour">
                                        {translations.hours}
                                    </label>
                                    <input
                                        id="deadline-hour"
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={deadlineHour}
                                        onChange={(e) => setDeadlineHour(e.target.value ? parseInt(e.target.value) : 0)}
                                    />
                                </div>
                            </div>
                        </div>
                         */}
                    </div></>)}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-between w-full">
                        <Button color="gray" onClick={() => {
                            setDefaultValue()
                            setOpenModal(false)
                        }} className="">
                            {translations.cancel}
                        </Button>
                        {/**
                         * <Button
                            onClick={saveElement}
                            className="capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {translations.add_workflow}
                        </Button>
                         */}
                    </div>
                </Modal.Footer>
            </Modal>
            <SendTemplateWorkflow showModal={showModal} lng={lng} hideModal={()=>{
                setShowModal(false)
                setOpenModal(true)
            }} fullHide={()=>{
                setOpenModal(false)
                setShowModal(false)
            }}/>
        </>
    )
}
