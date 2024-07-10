'use client' // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Cookies from 'js-cookie'
import { Button, Modal } from 'flowbite-react'
import { toast } from 'react-toastify'
import { Container, Button as FAButton, lightColors, darkColors } from 'react-floating-action-button'
import TemplateCards from '@/app/components/TemplateCards'
import { post, patch } from '@/services/RestService'
import { useTemplatesStore } from '@/store/TemplatesStore'

export default function TemplateCardsContainer({ translations }) {
    const {
        template,
        setTemplate,
        templates,
        getTemplates,
    } = useTemplatesStore((state) => ({
        template: state.template,
        setTemplate: state.setTemplate,
        templates: state.templates,
        getTemplates: state.getTemplates,
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [file, setFile] = useState(null);
    const [saveButtonText, setSaveButtonText] = useState('');

    const setDefaultValues = async () => {
        setTemplateName('');
        setFile(null);
        setTemplate(null)
    }

    const handleFileUpload = (files) => {
        // Verificar si se seleccionó un archivo
        if (files.length > 0) {
            const fileSelected = files[0]; // Tomar el primer archivo seleccionado
            // Realizar las operaciones necesarias con el archivo aquí
            console.log('Archivo seleccionado:', fileSelected);
            setFile(fileSelected)
        } else {
            console.log('Ningún archivo seleccionado.');
        }
    };

    const uploadFile = async ({ path, file, template_name, acc_id, staff_id, type, fileName, status}) => {
        const baseUrl = process.env.BASE_URL;
        if (baseUrl) {
            const formData = new FormData();
            formData.append('path', path);
            formData.append('file', file);
            formData.append('acc_id', acc_id);
            formData.append('staff_id', staff_id);
            formData.append('type', type);
            formData.append('status', status);
            fetch(`${baseUrl}:40007/files-manager/upload`, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al hacer la solicitud: ' + response.statusText);
                    }
                    return response.json(); // Extraer el cuerpo JSON
                })
                .then((data) => {
                    if (data.data.file_path) {
                        saveData({
                            template_name: template_name,
                            path_aws: data.data.file_path
                        })
                    }
                })
        }
    }

    const saveData = async ({ template_name, path_aws }) => {
        if (template?.id) {
            const body = {
                "template_name": template_name,
                "path_aws": path_aws,
                "type": "static"
            }
            try {
                const { data } = await patch(`:40007/admin/v1/template/update-template/${template.id}`, body);
                if(data.success) {
                    toast.success(`Operación satisfactoria`);
                    setOpenModal(false);
                    setDefaultValues();
                    getTemplates(`:40004/admin/v1/template/get-templates-by-accid/${user.acc_id}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            const body = {
                "acc_id": user.acc_id,
                "template_name": template_name,
                "path_aws": path_aws,
                "type": "static"
            }
            post(`:40004/admin/v1/template/create-template`, body) // Utilizar directamente post sin await
                .then(({ data }) => {
                    if (data.success) {
                        toast.success(`Operación satisfactoria`);
                        setOpenModal(false);
                        setDefaultValues();
                        getTemplates(`:40004/admin/v1/template/get-templates-by-accid/${user.acc_id}`);
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud POST:', error);
                });
        }
    }

    const saveElement = async () => {
        if (user?.acc_id && templateName && (template?.path_aws || file)) {
            if (file) {
                uploadFile({
                    path: 'ramPrueba/sub/2',
                    file: file,
                    template_name: templateName,
                    acc_id: user?.acc_id, 
                    staff_id: user?.staff_id, 
                    type: "Personal Templates", 
                    fileName: "", 
                    status: "Uploaded"
                })
            } else {
                saveData({
                    template_name: templateName,
                    path_aws: template.path_aws
                })
            }
        }
    }

    useEffect(() => {
        if (template?.id) {
            setTemplateName(template.template_name ? template.template_name : '');
            setOpenModal(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template]);

    useEffect(() => {
        setSaveButtonText(template?.id ? translations.update : translations.create)
    }, [template, translations.create, translations.update]);

    useEffect(() => {
        if (user?.acc_id) {
            getTemplates(`:40004/admin/v1/template/get-templates-by-accid/${user.acc_id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("TemplateCardsContainer desmontado")
        };
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <div className="-mx-4 sm:-mx-8 px-0 md:px-2 lg:px-6 py-4 overflow-x-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="border-2 rounded-lg p-4 w-full">
                            {/* <h5 className="font-semibold leading-tight">{translations.technology_group}</h5> */}
                            <h5 className="font-semibold leading-tight">{translations.templates}</h5>
                        </div>
                        {isLoading ? (
                            <div className="flex items-center justify-center mb-4"><ClipLoader
                                color={'#8049D7'}
                                loading={isLoading}
                                cssOverride={true}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></div>) : (
                            <>
                                <div className="border-b pb-6">
                                    <TemplateCards translations={translations} />
                                </div></>)}
                    </div>
                </div>
            </div>
            <Container className="!right-px !bottom-px z-10">
                <FAButton
                    styles={{ backgroundColor: darkColors.purple, color: lightColors.white }}
                    className="fab-item btn btn-link btn-lg text-white"
                    tooltip="Actions"
                    icon="fas fa-plus"
                    rotate={true}
                    onClick={() => setOpenModal(true)} />
            </Container>
            <Modal show={openModal} onClose={() => {
                setDefaultValues()
                setOpenModal(false)
            }}>
                <Modal.Header className="">{translations.create_template}</Modal.Header>
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
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.template_name}</label>
                                <input
                                    value={templateName}
                                    onChange={(event) => setTemplateName(event.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder={`${translations.template_name}`} />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 ">Upload File</label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    accept=".pdf,.doc,.docx" // Puedes especificar los tipos de archivos permitidos aquí
                                    onChange={(event) => handleFileUpload(event.target.files)}
                                    className="bg-[#1f2937] border border-gray-300 text-sm text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                        </div>
                    </>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-between w-full">
                        <Button color="gray" onClick={() => {
                            setDefaultValues()
                            setOpenModal(false)
                        }} className="">
                            {translations.cancel}
                        </Button>
                        <Button
                            onClick={saveElement}
                            className="capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {saveButtonText}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
