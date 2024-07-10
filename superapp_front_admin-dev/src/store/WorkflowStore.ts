import { UpdateStatusAttachment, getAllWorkflowByAccId, getBlockById, getWorkflowByWorkflowUserId } from '@/services/WorkflowService'
import { getUserByAccId } from '@/services/UsersService'
import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface WorkflowTask {
    acc_id: string
    block_id: string
    block_key: string
    block_type: 'document' | 'attachment' | 'form' | 'notification' | 'staticContent'
    id: string
    order: number
    responsibles_admin: string | null
    responsibles_user: string | null
    revision_status: string
    staff_id: string
    status_block: string
    status_flow: string
    workflow_id: string
    workflow_key: string
    workflow_user_id: string
}

interface RestrictionsFormFieldBlock {
    maxValue: number | null
    minValue: number | null
    required: boolean | null
    maxDate: string | null
    minDate: string | null
    maxLength: number | null
    minLength: number | null
    operands: string[] | null
    operation: string | null 
    additionalNumber: number | null
    options: string[] | null
}

interface FormFieldsBlock {
    key: string
    label: string
    type: string
    order: number
    restrictions: RestrictionsFormFieldBlock
}

interface TaskFormBlock {
    workflowKey: string
    blockKey: string
    type: string
    order: string
    formFields: FormFieldsBlock[] | null
}

interface AttachmentsFieldsBlock{
    allowed_file_types: string
    attachment_id: string
    detail_id: string
    file_path: string
    key: string
    label: string
    max_size: string
    order: number
}

interface TaskAttachmentBlock {
    attachments: AttachmentsFieldsBlock
    blockKey: string
    order: number
    type: string
    workflowKey: string
}

interface ContentStaticContentBlock{
    en: string
    es: string
    fr: string
}

interface TaskStaticContentBlock {
    blockKey: string
    content: ContentStaticContentBlock
    defaultLanguage: string
    order: number
    type: string
    workflowKey: string    
}

interface Workflow {
    workflow_id: string
    workflow_user_id: string
    deadline: string
    status_flow: string
    staff_id: any[]
    data: WorkflowTask[]
}

interface UserInfo {
    staff_id: string
    acc_id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    image: string
    com_name: string
    com_image?: string
    created_at: string
}
interface WorkflowState {
    workflowByUser: Array<any>, // workflows por usuario
    workflowList: [], // historial de emisiones de workflows (recomiendo usar WorkflowEmissionStore.ts) 👀
    currentWorkflow: Workflow | null
    currentWorkflowTask: WorkflowTask | null
    currentWorkflowTaskIndex: number
    totalWorkflowTasks: number
    currentBlock: TaskFormBlock | TaskAttachmentBlock | TaskStaticContentBlock | null
    currentBlockData: any
    currentUserInfo: UserInfo | null
    getWorkflowByUser: (url:string, post?: Function) => void
    nextWorkflowTask: () => void
    backWorkflowTask: () => void
    getWorkflowList: () => void
    getCurrentWorkflowByWorkflowUserId: (workflow_user_id: string, blockKey?: string) => void
    setCurrentWorkflow: (current: Workflow) => void
    setCurrentTask: (current: WorkflowTask) => void
    setCurrentBlockData: (current: any) => void
    updateCurrentWorkflowTaskStatus: (id: string, status: string, revisor_status?: string) => void
    updateStatusAttachment: (key: string, label: string, status: string, wf_user_id: string) => void
}



export const useWorkflowStore = createWithEqualityFn<WorkflowState>()((set) => ({
    workflowByUser: [],
    workflowList: [],
    currentWorkflow: null,
    currentWorkflowTask: null,
    currentWorkflowTaskIndex: 0,
    totalWorkflowTasks: 0,
    currentBlock: null,
    currentBlockData: {},
    currentUserInfo: null,
    setWorkflowByUser: (workflowByUser: Array<any>) => {
        set((state) => ({ workflowByUser: workflowByUser ? workflowByUser : [] }))
    },
    getWorkflowByUser: (url:string, post?: Function) => {
        get(url).then((response:any) => {
            set((state) => ({ workflowByUser: response.data?.data ? response.data.data : [] }))
            if(post) post();
        })
    },
    nextWorkflowTask: () => {
        set((state)=>{
            let newCurrentWorkflowTaskIndex = state.currentWorkflowTaskIndex+1;
            let currentWorkflowState = state.currentWorkflow?.data as WorkflowTask[]
            let newCurrentWorkflowTask = currentWorkflowState[newCurrentWorkflowTaskIndex];
            state.setCurrentTask(newCurrentWorkflowTask);
            return {
                currentWorkflowTaskIndex: newCurrentWorkflowTaskIndex
            }
        });
    },
    backWorkflowTask: () => {
        set((state)=>{
            let newCurrentWorkflowTaskIndex = state.currentWorkflowTaskIndex-1;
            let currentWorkflowState = state.currentWorkflow?.data as WorkflowTask[]
            let newCurrentWorkflowTask = currentWorkflowState[newCurrentWorkflowTaskIndex];
            state.setCurrentTask(newCurrentWorkflowTask);
            return {
                currentWorkflowTaskIndex: newCurrentWorkflowTaskIndex
            }
        });
    },
    getWorkflowList: () => {
        getAllWorkflowByAccId().then((data) => {
            const response = data.data;
            set((state) => ({ workflowList: response.data }))
        })
    },
    getCurrentWorkflowByWorkflowUserId: (workflow_user_id: string, blockKey?: string)=>{
        getWorkflowByWorkflowUserId(workflow_user_id).then((data)=>{
            const response = data.data.data[0] || data.data.data;
            let orderData = response.data.sort((a: any, b: any) => a.order - b.order);
            let currentWorkflowTask = orderData[0];
            let index = 0;
            if(blockKey) {
                currentWorkflowTask = orderData.find((item: WorkflowTask)=>item.block_key == blockKey) || orderData[0];
                index = orderData.findIndex((item: WorkflowTask)=>item.block_id === currentWorkflowTask.block_id)
                console.log(index)
            }
            response.data = orderData
            set((state) => ({ currentWorkflow: response, currentWorkflowTask: currentWorkflowTask, currentWorkflowTaskIndex: index, totalWorkflowTasks: response.data.length }))
            getBlockById(currentWorkflowTask.block_id, currentWorkflowTask.block_type, currentWorkflowTask.status_block, currentWorkflowTask.id).then((data)=>{
                const response = data.data
                set((state) => ({ currentBlock: response.data }))
            })
            getUserByAccId(currentWorkflowTask.acc_id).then((data)=>{
                const response = data.data;
                set((state) => ({ currentUserInfo: response.data[1] }))
            })
        })
    },
    setCurrentTask: (current: WorkflowTask) => {
        //Get Block Information
        set((state) => ({ 
            currentWorkflowTask: current,
            currentWorkflowTaskIndex: state.currentWorkflow?.data.findIndex((item: WorkflowTask)=>item.block_id === current.block_id)
         }))
        getBlockById(current.block_id, current.block_type, current.status_block, current.id).then((data)=>{
            const response = data.data
            set((state) => ({ currentBlock: response.data }))
        })
        getUserByAccId(current.acc_id).then((data)=>{
            const response = data.data;
            set((state) => ({ currentUserInfo: response.data[1] }))
        })
    },
    setCurrentWorkflow: (current: Workflow) => {
        current.data = current.data.sort((a, b) => a.order - b.order);
        set((state) => ({ currentWorkflow: current, currentWorkflowTask: current.data[0], totalWorkflowTasks: current.data.length }))
        getBlockById(current.data[0].block_id, current.data[0].block_type, current.data[0].status_block, current.data[0].id).then((data)=>{
            const response = data.data
            set((state) => ({ currentBlock: response.data }))
        })
        getUserByAccId(current.data[0].acc_id).then((data)=>{
            const response = data.data;
            set((state) => ({ currentUserInfo: response.data[1] }))
        })
    },
    setCurrentBlockData: (current: any) => set((state) => ({ currentBlockData: current })),
    updateCurrentWorkflowTaskStatus: (id: string, status: string, revision_status?: string) => {
        set((state)=>{
            if(state.currentWorkflow){
                let index = state.currentWorkflow.data.findIndex((item)=>item.id == id);
                let current = {...state.currentWorkflow.data[index as number]}
                let workflow = {...state.currentWorkflow}
                if(revision_status){
                    workflow.data[index] = {...current, status_block: status, revision_status: revision_status};
                    return {
                        currentWorkflow: workflow,
                        currentWorkflowTask: {...current, status_block: status, revision_status: revision_status}
                    }
                } else {
                    workflow.data[index] = {...current, status_block: status};
                    return {
                        currentWorkflow: workflow,
                        currentWorkflowTask: {...current, status_block: status}
                    }
                }
                
            } else {
                return {}
            }
        })
    },
    updateStatusAttachment: (key: string, label: string, status: string, wf_user_id: string, message: string = "", deadline?: string) => {
        UpdateStatusAttachment(key, label, status, wf_user_id, message, deadline).then((response)=> {
            if(response.data.success){
                set((state)=>{
                    if(state.currentBlock){
                        //@ts-ignore
                        let index = state.currentBlock.attachments.findIndex((item)=>item.key == key);
                        //@ts-ignore
                        let current = {...state.currentBlock.attachments[index as number]};
                        let block = {...state.currentBlock};
                        //@ts-ignore
                        block.attachments[index] = {...current, savedValue: {...current.savedValue, status: status}};
                        return {
                            currentBlock: block
                        }
                    } else {
                        return {}
                    }
                })
            }
        })
    }
  }), shallow)