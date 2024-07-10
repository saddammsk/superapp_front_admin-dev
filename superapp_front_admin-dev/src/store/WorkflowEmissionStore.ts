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

interface Workflow {
  workflow_id: string
  workflow_user_id: string
  data: WorkflowTask[]
}

interface WorkflowState {
  workflowEmissionsHistory: Workflow[]
  getWorkflowEmissionsHistory: (url: string) => void
}

export const useWorkflowEmissionStore = createWithEqualityFn<WorkflowState>()((set) => ({
  workflowEmissionsHistory: [], // historial de emisiones de workflow
  getWorkflowEmissionsHistory: (url) => {
    get(url).then((response) => {
      if(response.data?.data){
        const newData = [...response.data.data]
        let resultFilter = {
          reject: 0,
          toBeCORRECTED: 0,
          corrected: 0,
          inprogress: 0,
          completed: 0
        };
        newData?.forEach((element: StatusTasks)=> {
          resultFilter = {
              reject: 0,
              toBeCORRECTED: 0,
              corrected: 0,
              inprogress: 0,
              completed: 0
            };
            element?.data.forEach((item: TaskElement) => {
              if (
                  item.status_block === "REJECTED" &&
                  item.revision_status === "REJECTED"
                ) {
                  resultFilter.reject++;
                } else if (
                  item. revision_status ==="ToBeCORRECTED" &&
                  item.status_block === "REJECTED"
                ) {
                  resultFilter.toBeCORRECTED++;
                } else if (
                  (item.status_block === "CORRECTED" || item.status_block === "SUBMITTED") &&
                  item.revision_status === "ToBeCORRECTED"
                ) {
                  resultFilter.corrected++;
                } else if (
                  (item.status_block === "PENDING" || item.status_flow === "INPROCESS" || item.status_flow === "PENDING")
                ) {
                  resultFilter.inprogress++;
                } else if (
                  (item.status_block === "SUBMITTED" && item.revision_status === "APPROVED" && (item.status_flow === "COMPLETED" || item.status_flow === "SUBMITTED")) ||
                  (item.status_block === "SUBMITTED" && item.status_flow === "INPROCESS")
                ) {
                  resultFilter.completed++;
                }
          })
          if(resultFilter.reject>0){
              element.StatusMessage = 'REJECTED'
          }else{
              if(resultFilter.toBeCORRECTED>0){
                  element.StatusMessage = 'TOBECORRECTED'
              }else if(resultFilter.corrected>0){
                  element.StatusMessage = 'CORRECTED'
              }else if(resultFilter.inprogress>0){
                  element.StatusMessage = 'INPROCESS'
              }else if(resultFilter.completed === element?.data.length){
                  element.StatusMessage = 'COMPLETED'
              }
          }
      });
      set((state) => ({ workflowEmissionsHistory: response.data?.data ? newData : [] }))
      }
      set((state) => ({ workflowEmissionsHistory: response.data?.data ? response.data.data : [] }))
    })
  }
}), shallow)

export interface TaskElement {
  id:                 string;
  workflow_user_id:   string;
  workflow_id:        string;
  workflow_key:       string;
  acc_id:             string;
  block_id:           string;
  block_key:          string;
  block_label:        null;
  block_type:         string;
  order:              number;
  status_block:       string;
  required:           boolean;
  revision_status:    string;
  responsibles_admin: any[];
  responsibles_user:  ResponsiblesUser[];
  status_flow:        string;
  deadline:           string;
  emission_name:      string;
  date_create:        string;
}

export interface Emitter {
  staff_id:       string;
  acc_id:         string;
  firstName:      string;
  lastName:       string;
  documentTypeID: null;
  documentID:     null | string;
  phone:          string;
  email:          string;
  image:          string;
  com_name:       COMName;
  com_image:      string;
  rol?:           string;
  order?:         number;
}
export enum COMName {
  CocaCola = "Coca Cola",
  Orbis = "Orbis",
}

export interface StatusTasks {
  workflow_id:       string;
  workflow_user_id:  string;
  deadline:          string;
  status_flow:       string;
  StatusMessage?:    string;
  staff_id:          Emitter[];
  emission_name:     string;
  emitter:           Emitter;
  description:       string;
  workflow_key:      string;
  date_create:       string;
  date_last_updated: string;
  data:              TaskElement[];
}

export interface ResponsiblesUser {
  rol:       string;
  email:     string;
  image:     string;
  order:     number;
  acc_id:    string;
  com_name:  string;
  lastName:  string;
  staff_id:  string;
  com_image: string;
  firstName: string;
}