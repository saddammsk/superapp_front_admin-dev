import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface DynamicParamState {
    dynamicParams: any[],
    getDynamicParams: (url: string) => void
}

export const useDynamicParamStore = createWithEqualityFn<DynamicParamState>()((set) => ({
    dynamicParams: [],
    getDynamicParams: (url:string) => {
        get(url).then((response:any) => {
            set((state:any) => ({ dynamicParams: response.data?.data ? response.data.data : [] }))
        })
    }
}), shallow)