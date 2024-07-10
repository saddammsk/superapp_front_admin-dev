import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface UserState {
    user: any,
    setUser: (element: any) => void,
    getUser: (url: string) => void
}

export const useUserStore = createWithEqualityFn<UserState>()((set) => ({
    user: null, 
    setUser: (element:any) => {
        set((state:any) => ({ user: element }))
    },
    getUser: (url:string) => {
        get(url).then((response:any) => {
            set((state:any) => ({ user: response.data?.data ? response.data.data : null }))
        })
    }
}), shallow)