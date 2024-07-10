'use client' // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { Dropdown } from 'flowbite-react'
import { useTemplatesStore } from '@/store/TemplatesStore'
import { _delete } from '@/services/RestService'

export default function TemplateCardItem({ translations, element }) {
    const {
        setTemplate,
        getTemplates
    } = useTemplatesStore((state) => ({
        setTemplate: state.setTemplate,
        getTemplates: state.getTemplates,
    }));

    const [user, setUser] = useState(null);

    const editElement = async (element) => {
        setTemplate(element)
    }

    const deleteElement = async (element) => {
        if(user?.acc_id && element.id) {
            try {
                const { data } = await _delete(`:40007/admin/v1/template/${element.id} `);
                if (data.success) {
                    toast.success(`Operación satisfactoria`)
                    getTemplates(`:40004/admin/v1/template/get-templates-by-accid/${user.acc_id}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const renderTrigger = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#212b36"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        >
            <path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z" />
        </svg>
    )

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("TemplateCardItem desmontado")
        };
    }, []);

    return (
        <div className="rounded-lg">
            <div className="relative flex flex-col">
                <div className="absolute top-4 right-4">
                    <Dropdown label="" dismissOnClick={false} renderTrigger={renderTrigger} >
                        <Dropdown.Item onClick={() => { editElement(element) }} className="text-green-800 block text-sm w-full text-left capitalize">
                            <i className="fa fa-edit"></i> {translations.edit}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { deleteElement(element) }} className="text-red-800 block text-sm  w-full text-left capitalize">
                            <i className="fa fa-trash"></i> {translations.delete}
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex justify-center bg-gray-200 rounded-lg w-full h-full md:w-auto md:h-auto">
                    <Image
                        className="w-full h-full md:w-auto md:h-auto"
                        src={"/img/file.png"}
                        alt="file"
                        width={250}
                        height={250}
                    />
                </div>
            </div>
            <div className="rounded-md py-2 flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="flex items-center">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="#212b36"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12,3 C 8,3 8,21 12,21 C 16,21 16,3 12,3" />
                            <path d="M3,12 C 3,8 21,8 21,12 C 21,16 3,16 3,12" />
                        </svg>
                    </div>
                    <div className="flex items-center">
                        <span className="star-text evaluation-text font-semibold">{element.template_name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
