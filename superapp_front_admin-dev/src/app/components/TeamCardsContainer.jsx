'use client' // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Cookies from 'js-cookie'
import { Button, Modal } from 'flowbite-react'
import { toast } from 'react-toastify'
import { Container, Button as FAButton, lightColors, darkColors } from 'react-floating-action-button'
import TeamCards from '@/app/components/TeamCards'
import { post, patch } from '@/services/RestService'
import { useStaffStore } from '@/store/StaffStore'

export default function TeamCardsContainer({ translations }) {
    const {
        staff,
        setStaff,
        getStaffs,
    } = useStaffStore((state) => ({
        staff: state.staff,
        setStaff: state.setStaff,
        getStaffs: state.getStaffs,
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailB, setEmailB] = useState('');
    const [phone, setPhone] = useState('');
    const [saveButtonText, setSaveButtonText] = useState('');    

    const setDefaultValues = async () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setEmailB('');
        setPhone('');
        setStaff(null)
    }

    const saveElement = async () => {
        if(user?.acc_id && firstName && lastName && email && emailB) {
            const body = {
                "acc_id": user.acc_id,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "email_b": emailB,
                "phone": phone,
                /* "path_aws_iconImage": "https://cdn1.iconfinder.com/data/icons/user-avatar-20/64/28-man-128.png" */
            }
            if(staff?.staff_id) {
                try {
                    const { data } = await patch(`:40003/users/updateUser/${staff.staff_id}`, body);
                    if(data.success) {
                        toast.success(`Operación satisfactoria`)
                        setOpenModal(false)
                        setDefaultValues()
                        getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                try {
                    const { data } = await post(`:40003/users/createUser`, body);
                    if(data.success) {
                        toast.success(`Operación satisfactoria`)
                        setOpenModal(false)
                        setDefaultValues()
                        getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }

    useEffect(() => {
        if(staff) {
            setFirstName(staff.firstName ? staff.firstName : '');
            setLastName(staff.lastName ? staff.lastName : '');
            setEmail(staff.email ? staff.email : '');
            setEmailB('');
            setPhone(staff.phone ? staff.phone : '');
            setOpenModal(true)
        }
        setSaveButtonText(staff !== null && staff !== undefined ? translations.update : translations.create)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff]);

    useEffect(() => {
        if (user?.acc_id) {
            getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("TeamCardsContainer desmontado")
        };
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <div className="-mx-4 sm:-mx-8 px-0 md:px-2 lg:px-6 py-4 overflow-x-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="border-2 rounded-lg p-4 w-full">
                            {/* <h5 className="font-semibold leading-tight">{translations.technology_group}</h5> */}
                            <h5 className="font-semibold leading-tight">{translations.team}</h5>
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
                                    <TeamCards translations={translations}/>
                                </div></>)}
                    </div>
                </div>
            </div>
            <Container className="!right-px !bottom-px z-10">
                <FAButton
                    styles={{backgroundColor: darkColors.purple, color: lightColors.white}}     
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
                <Modal.Header className="">{translations.create_staff}</Modal.Header>
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
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.first_name}</label>
                            <input
                                value={firstName} 
                                onChange={(event) => setFirstName(event.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.first_name}`} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.last_name}</label>
                            <input
                                value={lastName} 
                                onChange={(event) => setLastName(event.target.value)}
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.last_name}`} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.email}</label>
                            <input
                                value={email} 
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.email}`} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="emailb" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.email_b}</label>
                            <input
                                value={emailB} 
                                onChange={(event) => setEmailB(event.target.value)}
                                type="email"
                                name="emailb"
                                id="emailb"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.email_b}`} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations.phone}</label>
                            <input
                                value={phone} 
                                onChange={(event) => setPhone(event.target.value)}
                                type="text"
                                name="phone"
                                id="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`${translations.phone}`} />
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