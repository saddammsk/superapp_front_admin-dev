import { get } from '@/services/RestService'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface TemplateState {
    template: any,
    templates: any[],
    setTemplate: (data: any) => void,
    getTemplates: (url: string, post?: Function) => void
}

export const useTemplatesStore = createWithEqualityFn<TemplateState>()((set) => ({
    template: null,
    templates: [], 
    setTemplate: (element) => {
        set((state:any) => ({ template: element }))
    },
    getTemplates: (url:string, post?: Function) => {
        get(url).then((response:any) => {
            set((state:any) => ({ templates: response.data?.data ? response.data.data : [] }))
            if(post) post();
        })
    }
}), shallow)