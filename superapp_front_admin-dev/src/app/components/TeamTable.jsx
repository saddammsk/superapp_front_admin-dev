'use client'; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from 'flowbite-react'
import { TOTAL_PAGES_PAGINATION } from '@/consts';
import { useStaffStore } from '@/store/StaffStore';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader'
import Cookies from 'js-cookie'
import { patch, _delete } from '@/services/RestService'
import { postUsers } from '@/services/UsersService';
import ConfirmationModal from './ConfirmationModal';



const translations = {
  previous: 'Anterior',
  next: 'Siguiente',
  create_staff: 'Editar Personal',
  update: 'Actualizar',
  create: 'Crear',
  cancel: 'Cancelar',
};

const defaultValue = {
  firstName: '',
  lastName: '',
  email: '',
  emailB: '',
  phone: '+',
}

const TablaComponent = ({ data }) => {

    const {
            staffs,
            getStaffs
    } = useStaffStore((state) => ({
            staffs: state.staffs,
            getStaffs: state.getStaffs,
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentData, setCurrentData] = useState(defaultValue);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState('');
  const [firstRender, setFirstRender] = useState(false);
  const [mode, setMode] = useState('');
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const itemsPerPage = 10;
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  useEffect(() => {
    if(staffs.length > 0 && firstRender===false){
        setSortedData([...staffs])
        setFirstRender(true)
    }
    setSortedData([...staffs])
  }, [staffs]);


  useEffect(() => {
    const decodedToken = Cookies.get('decodedToken');
    setUser(decodedToken ? JSON.parse(decodedToken) : null);
    return () => {
        console.log("TeamCardsContainer desmontado")
    };
  }, []);

  const handleChargeData = async (data, index) => {
    const newData = {
      firstName:  (data?.firstName && data?.firstName !== undefined) ? data?.firstName.trim() : '',
      lastName: (data?.lastName && data?.lastName !== undefined) ? data?.lastName.trim() : '',
      email: (data?.email && data?.email !== undefined) ? data?.email.trim() : '',
      emailB: (data?.email_b && data?.email_b !== undefined) ? data?.email_b.trim() : '',
      phone: (data?.phone && data?.phone !== undefined) ? data?.phone.trim() : '',
    }
    setCurrentData(data);
    handleMenuToggle(index)
  }

  const handleEdit = async (data) => {
    handleOpenModal('Editar Personal');
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9]{10,14}$/;
    return re.test(String(phone));
  };

  const saveElement = async (mode) => {

    let validationErrors = {};

      if (mode === 'Crear Personal') {
        if(!currentData?.email || currentData?.email.trim() === '') {
          validationErrors.email2 = 'El campo "Email" es obligatorio';
        }else if (!validateEmail(currentData?.email.trim())) {
          validationErrors.email = 'Correo electrónico no es válido';
        }
      }
      if (currentData?.emailB && !validateEmail(currentData?.emailB?.trim()) && currentData?.emailB.trim()!=='') {
        validationErrors.emailB = 'Correo electrónico B no es válido';
      }

      if(!currentData?.phone || currentData?.phone.trim() === '' || currentData?.phone.trim() === '+') {
        validationErrors.phone = 'El campo "Teléfono" es obligatorio';
      }else if (!validatePhone(currentData?.phone.trim())) {
        validationErrors.phone = 'Número de celular no es válido';
      }

      if(!currentData?.firstName || currentData?.firstName.trim() === '') {
        validationErrors.firstName = 'El campo "Nombre" es obligatorio';
      }

      if(!currentData?.lastName || currentData?.lastName.trim() === '') {
        validationErrors.lastName = 'El campo "Apellido" es obligatorio';
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {

        if(user?.acc_id && currentData?.firstName && currentData?.lastName && currentData?.email && currentData?.phone) {
          const body = {
            "firstName": currentData?.firstName.trim(),
            "lastName": currentData?.lastName.trim(),
            "email_b": currentData?.emailB ? currentData?.emailB.trim() : '',
            "phone": currentData?.phone.trim(),
             /* "path_aws_iconImage": "https://cdn1.iconfinder.com/data/icons/user-avatar-20/64/28-man-128.png" */
            }

          if(mode === 'Crear Personal') {
            body.acc_id = user?.acc_id,
            body.email = currentData?.email.trim()
          }
            if(currentData?.staff_id) {
                console.log('Crear')
                try {
                    const { data } = await patch(`:40003/users/updateUser/${currentData?.staff_id}`, body);
                    if(data.success) {
                        toast.success(`El usuario se actualizó correctamente`)
                        setOpenModal(false)
                        setCurrentData(defaultValue)
                        getStaffs(`:40003/users/getInternalUsers/${user?.acc_id}`);
                    }
                } catch (error) {
                    toast.error(`No se pudo actualizar el usuario`)
                    console.error('Error:', error);
                }
            } else {
                try {
                    const { data } = await postUsers(`/users/createUser`, body);
                    if(data.success) {
                        toast.success(`El usuario se creó correctamente`)
                        setOpenModal(false)
                        setCurrentData(defaultValue)
                        getStaffs(`:40003/users/getInternalUsers/${user?.acc_id}`);
                    }
                } catch (error) {
                    toast.error(error?.message);
                    toast.error('No se pudo crear el usuario');
                }
            }
        }
      } else {
        // Muestra los errores en un toast
        Object.values(validationErrors).forEach((error) => {
          toast.error(error);
        });
      }
    handleMenuToggle(null)
}

const handleOpenModal = (modo) => {
    setMode(modo);
    setOpenModal(true);
  }

  const deleteUser = async () => {
    if(!currentData?.staff_id){
      toast.error(`No se pudo encontrar el usuario a eliminar`)
    }else{
      try {
        const { data } = await _delete(`:40003/users/deleteUser/${currentData?.staff_id}`)
        if(data.success) {
          toast.success(`Usuario eliminado`)
          setIsOpenConfirmationModal(false)
          getStaffs(`:40003/users/getInternalUsers/${user?.acc_id}`);
          setCurrentData(defaultValue)
        }
      } catch (error) {
        toast.error(`No se pudo eliminar el usuario`)
        console.error('Error:', error);
      }
    }
    handleMenuToggle(null)
  }

const handleSort = (field) => {
    switch(field) {
        case 'nombre':
            field =  'firstName'
            break
        case 'apellido':
            field =  'lastName'
            break
        case 'email':
            field =  'email'
            break
        case 'emailb':
            field = 'emailB'
            break
        case 'phone':
            field =  'phone'
            break
    }

    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sorted = [...sortedData].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key: field, direction });
    setCurrentPage(1);
  };

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Asegura que siempre comience con '+'
    if (value === '') {
      setCurrentData({ ...currentData, phone: '+' })
    } else if (/^\+[0-9]*$/.test(value)) {
      setCurrentData({ ...currentData, phone: value })
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-lg font-bold mb-4 p-3 cursor-pointer border inline-flex rounded-lg border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors duration-500"
        onClick={() => handleOpenModal('Crear Personal')}
      >Crear Personal</div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className=" text-white uppercase text-sm leading-normal py-4 text-center"
            style={{ backgroundColor: '#6c7ae0' }}
          >
            {['Nombre', 'Apellido', 'Email', 'Telefono', ''].map((field) => (
              <th
                key={field}
                className="py-3 px-6 cursor-pointer text-center uppercase"
                onClick={() => field !== '' && handleSort(field.toLocaleLowerCase().replace(" ", ""))}
              >
                {field}
                {field && (
                  <i className={`fas fa-caret-${sortConfig.key === field.toLowerCase().replace(" ", "") && sortConfig.direction === 'asc' ? 'up' : 'down'} ml-2`} ></i>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((person, index) => (
            <tr key={index} className={`border-b border-gray-200 hover:bg-gray-200 text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-3 px-6 text-center">{person?.firstName ? person?.firstName : '-'}</td>
              <td className="py-3 px-6 text-center">{person?.lastName ? person?.lastName : '-'}</td>
              <td className="py-3 px-6 text-center">{person?.email ? person?.email : '-'}</td>
              <td className="py-3 px-6 text-center">{person?.phone ? person?.phone : '-'}</td>
              <td className="py-3 px-6 text-center relative">
                <button onClick={() =>
                  handleChargeData(person, index)
                } className="focus:outline-none">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                {menuOpen === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-40">
                    <button onClick={() => handleEdit(person)} className="block w-full text-left px-4 py-2 text-green-800 hover:bg-gray-100"><i className="fa fa-edit"></i> Editar</button>
                    <button onClick={() => setIsOpenConfirmationModal(true)} className="block w-full text-left px-4 py-2 text-red-800 hover:bg-gray-100"><i className="fa fa-trash"></i> Eliminar</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex overflow-x-auto justify-end w-full mt-2 mb-2 pr-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            previousLabel={translations.previous}
            nextLabel={translations.next}
            onPageChange={handlePageChange}
            showIcons
          />
        </div>
      )}
      <Modal show={openModal} onClose={() => {
                setCurrentData(defaultValue)
                setOpenModal(false)
                handleMenuToggle(null)
            }}>
                {/* <Modal.Header className="">{translations.create_staff}</Modal.Header> */}
                <Modal.Header className="">{mode ? mode : 'Crear Personal'}</Modal.Header>
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
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Nombre'} <span className='text-red-600'>*</span></label>
                            <input
                                value={currentData.firstName} 
                                onChange={(event) => setCurrentData({ ...currentData, firstName: event.target.value })}
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={``} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Apellido'} <span className='text-red-600'>*</span></label>
                            <input
                                value={currentData.lastName} 
                                onChange={(event) => setCurrentData({ ...currentData, lastName: event.target.value })}
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={``} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="email" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white
                              ${mode === 'Editar Personal' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
                            `}>{'Email'} <span className='text-red-600'>*</span></label>
                            <input
                                value={currentData.email} 
                                onChange={(event) => setCurrentData({ ...currentData, email: event.target.value })}
                                type="email"
                                name="email"
                                id="email"
                                disabled={mode === 'Editar Personal'}
                                className={`${
                                  mode === 'Editar Personal'
                                    ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                    : 'bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                } text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                placeholder={``} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="emailb" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Email B'}</label>
                            <input
                                value={currentData.emailB}
                                onChange={(event) => setCurrentData({ ...currentData, emailB: event.target.value })}
                                type="email"
                                name="emailb"
                                id="emailb"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={``} />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{'Teléfono'} <span className='text-red-600'>*</span></label>
                            <input
                                value={currentData.phone}
                                onChange={(event) => handlePhoneChange(event)}
                                type="text"
                                name="phone"
                                id="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                maxLength="13"
                                placeholder={`  `} />
                        </div>
                    </div>
                    </>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-between w-full">
                        <Button color="gray" onClick={() => {
                            setOpenModal(false)
                            setCurrentData(defaultValue)
                            handleMenuToggle(null)
                        }} className="">
                            {translations.cancel}
                        </Button>
                        <Button
                            onClick={() => {saveElement(mode)}}
                            className="capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            {mode==='Crear Personal' ? 'Crear' : 'Actualizar'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ConfirmationModal isOpen={isOpenConfirmationModal} onClose={()=> {
              setIsOpenConfirmationModal(false)
              handleMenuToggle(null)
              }} onSubmit={deleteUser} mnsj={`¿Estas seguro de eliminar a "${currentData?.firstName}"?`} title={'Eliminar'}/>
    </div>
  );
};

export default TablaComponent;
