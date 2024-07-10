import { useTranslation } from '@/app/i18n';
import WorkflowPage from '@/app/components/pages/WorkflowPage';
import WorkflowsCards from '@/app/components/WorkflowsCards';
import WorkflowsDisclosure from '@/app/components/WorkflowsDisclosure';


export default async function Workflows({ params: { lng } }) {
    const { t: ta } = await useTranslation(lng, 'app');
    const { t: tw } = await useTranslation(lng, 'workflows');
    const { t: tf } = await useTranslation(lng, 'workflow-form');
    return (
        <>
            <WorkflowPage translations={{
                create: ta('create'),
                cancel: ta('cancel'),
                prev: ta('prev'),
                next: ta('next'),
                directory: ta('directory'),
                add: ta('add'),
                save: ta('save'),
                my_workflows: tw('my_workflows'),
                blocks: tw('blocks'),
                all: tw('all'),
                by_categories: tw('by_categories'),
                static_content_blocks: tw('static_content_blocks'),
                document_blocks: tw('document_blocks'),
                form_blocks: tw('form_blocks'),
                attachments_blocks: tw('attachments_blocks'),
                notifications_blocks: tw('notifications_blocks'),
                workflow_responsible: tw('workflow_responsible'),
                workflow_recipients: tw('workflow_recipients'),
                internal_users: tw('internal_users'),
                external_users: tw('external_users'),
                workflow_name: tf('workflow_name'),
                emission_name: tf('emission_name'),
                enter_emission_name: tf('enter_emission_name'),
                select_workflow: tf('select_workflow'),
                select_workflow_deadline: tf('select_workflow_deadline'),
                managers_reviewers: tf('managers_reviewers'),
                workflow: tf('workflow'),
                deadline: tf('deadline'),
                send_workflow: tf('send_workflow'),
                initial_information: tf('initial_information'),
                step: tf('step'),
                recipients: tf('recipients'),
                recipients_group: tf('recipients_group'),
                recipient_groups_shown_here: tf('recipient_groups_shown_here'),
                new_group: tf('new_group'),
                here_create_new_recipient_group: tf('here_create_new_recipient_group'),
                group_name: tf('group_name'),
                required: tf('required'),
                optional: tf('optional')
            }}>
                <div className="container mx-auto font-inter">
                    <div className='py-2.5 flex lg:flex-row flex-col gap-[11px]'>
                        {/* <h2 className="text-2xl font-semibold leading-tight">{ta('workflows')}</h2> */}
                        <div className='w-full lg:w-1/3 lg:max-w-[302px]'>
                        <ul className='flex items-center gap-3 mb-4'>
                            <li>
                                <a href="#" className='text-gray-2000 font-inter text-sm'>Home</a>
                            </li>
                            <li className='text-gray-2000 font-inter text-sm'>
                                /
                            </li>
                            <li>
                                <a href="#" className='text-green-1000 font-inter text-sm'>Flujos de trabajo</a>
                            </li>
                        </ul>
                 
                        <a href="#" className='flex items-center text-black-1000 gap-2.5 xl:text-2xl text-xl font-bold font-dm-sans mb-[21px]'>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12.5H19M5 12.5L11 18.5M5 12.5L11 6.5" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Flujos de trabajo</span>
                        </a>

                        <div>
                        <a href="#" className='flex items-center lg:justify-normal justify-center font-dm-sans xl:gap-10 gap-6 xl:px-[60px] px-6 mb-1.5 text-center text-15 text-green-2000 border border-green-3000 rounded-lg py-3 font-bold'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7175 7.99999H1.28249M8 1.28247V14.7175" stroke="#0CAF60" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Crear flujod
                        </a> 

                        <div className='rounded-lg w-full border border-gray-12000 px-[17px] py-[13px]'>
                            <div className="w-full flex items-center justify-between mb-3">
                                <p className='text-13 text-gray-4000 font-medium font-inter'>Mis flujos de trabajo</p>
                                <a href="#">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.6665 4.5H8.6665M2.6665 8.5H7.33317M2.6665 12.5H7.33317M9.99984 10.5L11.9998 12.5M11.9998 12.5L13.9998 10.5M11.9998 12.5V4.5" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                </a>
                            </div>

                            <div className='w-full border mb-3 border-gray-100 rounded-lg py-2 px-4 flex items-center justify-center flex-col text-center'>
                                <p className='text-13 text-purple-1000 font-medium font-inter mb-1'>34 Flujos de trabajo</p>
                                <p className='text-13 text-gray-4000 font-medium font-inter mb-1'>20 Masivos</p>
                                <p className='text-13 text-gray-4000 font-medium font-inter'>14 Individuales</p>

                            </div>

                            <div className='flex items-center flex-col xl:flex-row gap-2 mb-3'>
                                <button className='flex w-full bg-purple-1000 text-white items-center justify-center px-[24.5px] rounded-lg py-2 gap-2.5 font-inter text-sm'>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.16667 8C7.16667 8.35362 7.30714 8.69276 7.55719 8.94281C7.80724 9.19286 8.14638 9.33333 8.5 9.33333C8.85362 9.33333 9.19276 9.19286 9.44281 8.94281C9.69286 8.69276 9.83333 8.35362 9.83333 8C9.83333 7.64638 9.69286 7.30724 9.44281 7.05719C9.19276 6.80714 8.85362 6.66667 8.5 6.66667C8.14638 6.66667 7.80724 6.80714 7.55719 7.05719C7.30714 7.30724 7.16667 7.64638 7.16667 8Z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.5 8C12.9 10.6667 10.9 12 8.5 12C6.1 12 4.1 10.6667 2.5 8C4.1 5.33333 6.1 4 8.5 4C10.9 4 12.9 5.33333 14.5 8Z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Masivos
                                </button>

                                <button className='flex border w-full border-gray-16000 text-gray-12000 items-center justify-center px-[12.5px] rounded-lg py-2 gap-2.5 font-inter text-sm'>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.55671 7.05794C7.3067 7.30804 7.16628 7.64721 7.16634 8.00085C7.1664 8.35448 7.30694 8.6936 7.55704 8.94361C7.80714 9.19362 8.14631 9.33404 8.49994 9.33398C8.85358 9.33392 9.1927 9.19338 9.44271 8.94328M11.6207 11.1154C10.6855 11.7005 9.6031 12.0073 8.5 12C6.1 12 4.1 10.6667 2.5 8.00002C3.348 6.58669 4.308 5.54802 5.38 4.88402M7.28667 4.12002C7.68603 4.03917 8.09254 3.99897 8.5 4.00002C10.9 4.00002 12.9 5.33335 14.5 8.00002C14.056 8.74002 13.5807 9.37802 13.0747 9.91335M2.5 2L14.5 14" stroke="#85869E" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className='text-gray-16000'>
                                Individuales
                                </span>
                                </button>
                            </div>

                            <div className='w-full overflow-y-auto no-scrollbar max-h-[353px]  lg:max-h-[653px] overflow-x-hidden'>

                                <ul className='flex items-start flex-col w-full gap-1'>
                                    <li className='w-full'>
                                        <div className='active-card w-full bg-purple-2000 flex items-start flex-col p-3.5 rounded-lg border border-purple-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-purple-1000'>CONTRATACIÓN</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#6247CD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>6 Bloques</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>CONTRATACIÓN</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>12 Bloques</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='w-full'>
                                        <div className=' w-full bg-white flex items-start flex-col p-3.5 rounded-lg border border-gray-1000'>
                                            <div className='flex w-full items-center justify-between gap-5 mb-1'>
                                                <h4 className='text-xs font-bold text-black-3000 uppercase'>PROFAMILIA-7746512</h4>
                                                <button>
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L4 12.5M4 4.5L12 12.5" stroke="#9a9a9a" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                </button>                                            
                                            </div>
                                            <div>
                                                <p className='text-black-3000 text-xs mb-1'>02/04/2024</p>
                                                <p className='text-black-3000 text-xs'>8 Bloques</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            
                            </div>

                        </div>
                         </div>
                        </div>

                        <div className='w-full 3xl:w-full lg:w-2/3 xl:w-[72%]'>
                            <div className='w-full grid sm:grid-cols-3 grid-cols-1 gap-3.5 mb-3'>
                                <div className="w-full border border-gray-12000 flex flex-col items-center justify-center rounded-lg py-3 px-5">
                                    <h2 className='text-2xl font-medium mb-1 text-center text-black-3000'>34</h2>
                                    <p className='text-13 text-black-3000 text-center font-medium'>Flujos de trabajo totales</p>
                                </div>
                                <div className="w-full border border-gray-12000 flex flex-col items-center justify-center rounded-lg py-3 px-5">
                                    <h2 className='text-2xl font-medium mb-1 text-center text-black-3000'>20</h2>
                                    <p className='text-13 text-black-3000 text-center font-medium'>Flujos Masivos</p>
                                </div>
                                <div className="w-full border border-gray-12000 flex flex-col items-center justify-center rounded-lg py-3 px-5">
                                    <h2 className='text-2xl font-medium mb-1 text-center text-black-3000'>14</h2>
                                    <p className='text-13 text-black-3000 text-center font-medium'>Flujos Individuales</p>
                                </div>
                            </div>
                            <div>
                            <div className="w-full">
                                <WorkflowsDisclosure/>

                            </div>
                              </div>

                   
                 </div>
                    {/* <WorkflowsCards /> */}
                </div>
                </div>
            </WorkflowPage>
        </>
    )
}
