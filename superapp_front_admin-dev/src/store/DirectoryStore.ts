import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface DirectoryUserState {
    directoryUsers: any[],
    getDirectoryUsers: (url: string) => void
}

export const useDirectoryUserStore = createWithEqualityFn<DirectoryUserState>()((set) => ({
    directoryUsers: [],
    getDirectoryUsers: (url:string) => {
        get(url).then((response:any) => {
            set((state:any) => ({ directoryUsers: response.data?.data ? response.data.data : [] }))
        })
    }
}), shallow)