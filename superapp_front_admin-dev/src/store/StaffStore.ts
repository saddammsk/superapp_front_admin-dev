import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
const baseUrl = `https://super.xertify.co`


interface StaffState {
    staff: any,
    staffs: any[],
    setStaff: (element: any) => void,
    getStaffs: (url: string) => void
}

export const useStaffStore = createWithEqualityFn<StaffState>()((set) => ({
    staff: null, 
    staffs: [], 
    setStaff: (element:any) => {
        set((state:any) => ({ staff: element }))
    },
    getStaffs: (url:string, completeURL?:boolean) => {
        if(completeURL){
            get(baseUrl+url).then((response:any) => {
                set((state:any) => ({ staffs: response.data?.data ? response.data.data : [] }))
            })
        }else{
            get(url).then((response:any) => {
                set((state:any) => ({ staffs: response.data?.data ? response.data.data : [] }))
            })
        }
    }
}), shallow)