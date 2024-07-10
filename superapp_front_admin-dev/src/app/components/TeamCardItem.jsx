import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Dropdown } from 'flowbite-react'
import { toast } from 'react-toastify'
import { _delete } from '@/services/RestService'
import { useStaffStore } from '@/store/StaffStore'

export default function TeamCardItem({ translations, element }) {
    const {
        setStaff,
        getStaffs,
    } = useStaffStore((state) => ({
        setStaff: state.setStaff,
        getStaffs: state.getStaffs,
    }));

    const [user, setUser] = useState(null);

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


    const deleteElement = async () => {
        if(element.staff_id && user?.acc_id) {
            try {
                const { data } = await _delete(`:40003/users/deleteUser/${element.staff_id} `);
                if (data.success) {
                    toast.success(`Operación satisfactoria`)
                    getStaffs(`:40003/users/getInternalUsers/${user.acc_id}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const editElement = async () => {
        setStaff(element);
    }

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("TeamCardItem desmontado")
        };
    }, []);

    return (
        <div className="border rounded-md">
            <div className="flex flex-col p-4">
                <div className="flex justify-end">
                    <Dropdown label="" dismissOnClick={false} renderTrigger={renderTrigger} >
                        <Dropdown.Item onClick={editElement} className="text-green-800 block text-sm w-full text-left capitalize">
                            <i className="fa fa-edit"></i> {translations.edit}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={deleteElement} className="text-red-800 block text-sm  w-full text-left capitalize">
                            <i className="fa fa-trash"></i> {translations.delete}
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex justify-center">
                    <Image
                        className="rounded-full"
                        src={element.image ? element.image : "/img/default-avatar.jpg"}
                        alt="Rounded avatar"
                        width={150}
                        height={150}
                    />
                </div>
            </div>
            <div className="border rounded-md m-2 py-4 px-2 flex flex-col gap-4">
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
                            <circle cx="12" cy="8" r="5" />
                            <path d="M3,21 h18 C 21,12 3,12 3,21" />
                        </svg>
                    </div>
                    <div className="flex items-center">
                        <span className="star-text evaluation-text capitalize">{element.firstName} {element.lastName}</span>
                    </div>
                </div>
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
                            <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
                        </svg>
                    </div>
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-indigo-600">{element.email}</span>
                        </Link>
                    </div>
                </div>
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
                        <span className="star-text evaluation-text">{element.com_name}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M16 22.621l-3.521-6.795c-.007.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.082-1.026-3.492-6.817-2.106 1.039c-1.639.855-2.313 2.666-2.289 4.916.075 6.948 6.809 18.071 12.309 18.045.541-.003 1.07-.113 1.58-.346.121-.055 2.102-1.029 2.11-1.033zm-2.5-13.621c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
                    </div>
                    <div className="flex items-center">
                        <span className="star-text evaluation-text">{element.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
