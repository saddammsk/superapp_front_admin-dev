"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  Container,
  Button as FAButton,
  lightColors,
  darkColors,
} from "react-floating-action-button";
import { WORKFLOW_DATA, TOTAL_PAGES_PAGINATION } from "@/consts";
import { post, patch, _delete } from "@/services/RestService";
import { useAppStore } from "@/store/AppStore";
import { useDirectoryUserStore } from "@/store/DirectoryStore";
import { useRouter } from "next/navigation";
import { getDocumentTypesGroupByCountry } from '@/services/UsersService'
import Select, { components, GroupProps } from 'react-select';

export default function DirectoryTable({ headers, translations }) {
  const { search } = useAppStore((state) => ({
    search: state.search,
  }));

  const router = useRouter();

  const { directoryUsers, getDirectoryUsers } = useDirectoryUserStore(
    (state) => ({
      directoryUsers: state.directoryUsers,
      getDirectoryUsers: state.getDirectoryUsers,
    })
  );

  const [externalElements, setExternalElements] = useState([]);
  const [paginatedExternalData, setPaginatedExternalData] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalMetadata, setOpenModalMetadata] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [documentType, setDocumentType] = useState(null);
  const [documentId, setdocumentId] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workingCompany, setWorkingCompany] = useState("");
  const [saveButtonText, setSaveButtonText] = useState("");
  const [staff, setStaff] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  /* paginacion */
  const [externalCurrentPage, setExternalCurrentPage] = useState(0);
  const [externalTotalPages, setExternalTotalPages] = useState(1);
  
  const onExternalPageChange = (data, page) => {
    const startIndex = (page - 1) * TOTAL_PAGES_PAGINATION;
    const finalIndex = page * TOTAL_PAGES_PAGINATION;

    setPaginatedExternalData(data.slice(startIndex, finalIndex));
    setExternalCurrentPage(page);
  };

  const [documentTypes, setDocumentTypes] = useState([]);
  /* paginacion */
  const [inputs, setInputs] = useState([]);
  const [jsonResult, setJsonResult] = useState({});

  /* headers */
  const [comName, setComName] = useState('');
  const [documentTypeID, setDocumentTypeID] = useState('');
  const [documentID, setDocumentID] = useState('');
  const [name, setName] = useState('');
  const [emailH, setEmailH] = useState('');
  const [phoneH, setPhoneH] = useState('');


  const addInput = () => {
    setInputs([...inputs, { key: '', value: '' }]);
  };

  const handleChange = (index, type, value) => {
    const newInputs = inputs.map((input, i) => {
      if (i === index) {
        return { ...input, [type]: value };
      }
      return input;
    });
    setInputs(newInputs);
    const newJson = newInputs.reduce((acc, curr) => {
      if (curr.key) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {});
    setJsonResult(newJson);
  };

  useEffect(()=>{
    getDocumentTypesGroupByCountry().then((response)=>{
      setDocumentTypes(response.map((item)=>{
        return {
          label: item.NAME,
          options: item.documents.map((it)=>{
            return {
              value: it.ID_ID,
              label: it.NAME
            }
          })
        }
      }))
    });
  }, [])

  const setDefaultValues = async () => {
    setDocumentType(null);
    setdocumentId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setWorkingCompany("");
  };

  const saveElement = async () => {
    if (user?.acc_id && firstName && lastName && email && documentType) {
      if (staff?.id) {
        const body = {
          name: firstName,
          lastName: lastName,
          workingCompany: workingCompany,
          phone: phone,
          documentID: documentId,
          documentTypeID: documentType.value,
          metadata: jsonResult
          /* "path_aws_iconImage": "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg",
                    "path_aws_iconImageCompany": "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg" */
        };
        try {
          const { data } = await patch(
            `:40004/admin/v1/directory/updateDirectory/${staff.id}`,
            body
          );
          if (data.success) {
            toast.success(`Operación satisfactoria`);
            setOpenModal(false);
            setDefaultValues();
            fetchElements();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        const body = {
          acc_id: user.acc_id,
          name: firstName,
          lastName: lastName,
          email: email,
          workingCompany: workingCompany,
          phone: phone,
          documentID: documentId,
          documentTypeID: documentType.value,
          metadata: jsonResult
          /* "path_aws_iconImage": "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg",
                    "path_aws_iconImageCompany": "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg" */
        };
        try {
          const { data } = await post(`:40004/admin/v1/directory`, body);
          if (data.success) {
            toast.success(`Operación satisfactoria`);
            setOpenModal(false);
            setDefaultValues();
            fetchElements();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }else{
      toast.error("Ingrese ingrese todos los campos")
    }
  };

  const Group = (props) => (
    <div>
      <components.Group {...props} />
    </div>
  );

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
  );
  
  const deleteElement = async (element) => {
    if (element.id) {
      try {
        const { data } = await _delete(
          `:40004/admin/v1/directory/${element.id} `
        );
        if (data.success) {
          toast.success(`Operación satisfactoria`);
          fetchElements();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const editElement = async (element) => {
    
    setStaff(element);
    if (element && staff && element?.staff_id == staff?.staff_id) {
      setDocumentType(element.documentTypeID && element.documentTypeName ? {label: element.documentTypeName, value: element.documentTypeID} : null);
      setdocumentId(element.documentID ? element.documentID : "");
      setFirstName(staff.firstName ? staff.firstName : "");
      setLastName(staff.lastName ? staff.lastName : "");
      setEmail(staff.email ? staff.email : "");
      setPhone(staff.phone ? staff.phone : "");
      setWorkingCompany(staff.com_name ? staff.com_name : "");
      if(staff.metadata){
        setJsonResult(staff.metadata)
        const initialInputs = Object.entries(staff.metadata).map(([key, value]) => ({
          key,
          value
        }));
        setInputs(initialInputs);
      }
      setOpenModal(true);
    }
  };

  const fetchElements = async () => {
    getDirectoryUsers(`:40004/admin/v1/directory/${user.acc_id}`);
  };

  useEffect(() => {
    if (user?.acc_id) {
      /* fetch elements */
      fetchElements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /*useEffect(() => {
    if (search.length) {
      setPaginatedExternalData(
        externalElements.filter((e) => {
          if (
            (e.name && e.name.toLowerCase().includes(search.toLowerCase())) ||
            (e.firstName &&
              e.firstName.toLowerCase().includes(search.toLowerCase())) ||
            (e.documentID &&
              e.documentID.toLowerCase().includes(search.toLowerCase())) ||
            (e.lastName &&
              e.lastName.toLowerCase().includes(search.toLowerCase())) ||
            (e.email && e.email.toLowerCase().includes(search.toLowerCase())) ||
            (e.phone && e.phone.toLowerCase().includes(search.toLowerCase())) ||
            (e.com_name &&
              e.com_name.toLowerCase().includes(search.toLowerCase()))
          )
            return e;
        })
      );
      setExternalTotalPages(0);
    } else {
      onExternalPageChange(externalElements, 1);
      setExternalTotalPages(
        Math.ceil(externalElements.length / TOTAL_PAGES_PAGINATION)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);*/

  // useEffect(() => {
  //   const filtered = externalElements.filter((e) => {
  //     if (
  //       (e.name && e.name.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (e.firstName && e.lastName &&
  //         `${e.firstName.toLowerCase()} ${e.lastName.toLowerCase()}`.includes(searchInput.toLowerCase())) ||
  //       (e.documentID &&
  //         e.documentID.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (e.lastName &&
  //         e.lastName.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (e.email && e.email.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (e.phone && e.phone.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (e.com_name &&
  //         e.com_name.toLowerCase().includes(searchInput.toLowerCase()))
  //     )
  //       return e;
  //   });
  //   setPaginatedExternalData(filtered);
  //   setExternalTotalPages(Math.ceil(filtered.length / TOTAL_PAGES_PAGINATION));
  //   onExternalPageChange(filtered, 1);
  // }, [searchInput, externalElements]);

  useEffect(() => {
    if (directoryUsers) {
      console.log(directoryUsers)
      setExternalElements(directoryUsers);
      onExternalPageChange(directoryUsers, 1);
      setExternalTotalPages(
        Math.ceil(directoryUsers.length / TOTAL_PAGES_PAGINATION)
      );
    }
  }, [directoryUsers]);

  useEffect(() => {
    if (staff) {
      setDocumentType(staff.documentTypeID ? {label: staff.documentTypeName, value: staff.documentTypeID} : null)
      setdocumentId(staff.documentID ? staff.documentID : "");
      setFirstName(staff.firstName ? staff.firstName : "");
      setLastName(staff.lastName ? staff.lastName : "");
      setEmail(staff.email ? staff.email : "");
      setPhone(staff.phone ? staff.phone : "");
      setWorkingCompany(staff.com_name ? staff.com_name : "");
      if(staff.metadata){
        setJsonResult(staff.metadata)
        const initialInputs = Object.entries(staff.metadata).map(([key, value]) => ({
          key,
          value
        }));
        setInputs(initialInputs);
      }else{
        setInputs([])
      }
      setOpenModal(true);
    }
    setSaveButtonText(
      staff !== null && staff !== undefined
        ? translations.update
        : translations.create
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff]);

  useEffect(() => {
    const decodedToken = Cookies.get("decodedToken");
    setUser(decodedToken ? JSON.parse(decodedToken) : null);
    return () => {
      console.log("Workflows desmontado");
    };
  }, []);

  const getDocumentTypeNameById = (id) => {
    let documents = [];
    documentTypes.map((item)=>{
      item.options.map((docs)=>{
        documents.push(docs)
      })
    })
    let document = documents.find((item)=>item.value === id)
    return document?.label
  }

  const handleSort = (field) => {
    if (sortField === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
        setSortField(field);
        setSortOrder('asc');
    }
};

const [sortedData, setSortedData] = useState([]);
// Otros estados y funciones de tu componente

useEffect(() => {console.log(paginatedExternalData)
    let dataToSort = [...paginatedExternalData]; // Clonamos paginatedData para no mutarlo directamente
    if (sortField === 'name' && sortOrder) {
        dataToSort.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }
            return sortOrder === 'asc' ? comparison : comparison * -1;
        });
    }else if (sortField && sortOrder) {
        dataToSort.sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            let comparison = 0;
            if (fieldA > fieldB) {
                comparison = 1;
            } else if (fieldA < fieldB) {
                comparison = -1;
            }
            return sortOrder === 'asc' ? comparison : comparison * -1;
        });
    }
    setSortedData(dataToSort);
}, [paginatedExternalData, sortField, sortOrder]);

useEffect(() => {
  let filtered = externalElements;

  if (comName) {
      filtered = externalElements.filter((data) =>
          data.com_name && data.com_name.toLowerCase().includes(comName.toLowerCase())
      );
  }else if (documentTypeID) {
      filtered = externalElements.filter((data) =>
          data.documentTypeName && data.documentTypeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(documentTypeID.toLowerCase())
      );
  }else if (documentID) {
    filtered = externalElements.filter((data) =>
        data.documentID && data.documentID.toLowerCase().includes(documentID.toLowerCase())
    );
  }else if (emailH) {
    filtered = externalElements.filter((data) =>
        data.email && data.email.toLowerCase().includes(emailH.toLowerCase())
    );
  }else if (phoneH) {
    filtered = externalElements.filter((data) =>
        data.phone && data.phone.toLowerCase().includes(phoneH.toLowerCase())
    );
  }else if (name) {
      filtered = externalElements.filter((data) =>
        (data.firstName && data.lastName &&
          `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`.includes(name.toLowerCase()))
      );
  } else if (searchInput) {
    filtered = externalElements.filter((e) => {
      if (
        (e.name && e.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.firstName && e.lastName &&
          `${e.firstName.toLowerCase()} ${e.lastName.toLowerCase()}`.includes(searchInput.toLowerCase())) ||
        (e.documentID &&
          e.documentID.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.lastName &&
          e.lastName.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.email && e.email.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.phone && e.phone.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.com_name &&
          e.com_name.toLowerCase().includes(searchInput.toLowerCase()))
      )
        return e;
    });
    
  }

  setPaginatedExternalData(filtered);
    setExternalTotalPages(Math.ceil(filtered.length / TOTAL_PAGES_PAGINATION));
    onExternalPageChange(filtered, 1);
}, [searchInput, comName, documentTypeID, documentID, name, emailH, phoneH, externalElements]);


const handleGeneralInputChange = (e) => {
  setSearchInput(e.target.value);
  setComName('');
  setDocumentTypeID('');
};


  return (
    <>
      <div className="container mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center mb-4">
            <ClipLoader
              color={"#8049D7"}
              loading={isLoading}
              cssOverride={true}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="-mx-4 sm:-mx-8 px-0 lg:px-6 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <div className="flex justify-end mb-4 p-2">
                  <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="px-4 py-2 border rounded"
                  />
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>
                    {/* {headers.map((data, index) => {
                      return (
                        <th
                          key={index}
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {data}
                        </th>
                      );
                    })} */}
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('com_name')}>{translations.company}
                        {sortField === 'com_name' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={comName}
                            onChange={(e) => {
                                setComName(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('documentTypeID')}>{translations.type_documento}
                        {sortField === 'documentTypeID' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={documentTypeID}
                            onChange={(e) => {
                                setDocumentTypeID(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('documentID')}>{translations.id_label}
                        {sortField === 'documentID' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={documentID}
                            onChange={(e) => {
                                setDocumentID(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('name')}>{translations.name}
                        {sortField === 'name' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('email')}>{translations.email}
                        {sortField === 'email' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={emailH}
                            onChange={(e) => {
                                setEmailH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('phone')}>{translations.phone}
                        {sortField === 'phone' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={phoneH}
                            onChange={(e) => {
                                setPhoneH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span>{translations.actions}</span>
                        
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((data, index) => {
                    const companyImage = data.com_image
                      ? data.com_image
                      : data.path_aws_iconImageCompany;
                    const staffImage =
                      data.image && data.image.includes("https")
                        ? data.image
                        : data.path_aws_iconImage;
                    return (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center mb-4">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <Image
                                className="w-full h-full rounded-full"
                                src={
                                  companyImage && companyImage.includes("https")
                                    ? companyImage
                                    : "/img/default-avatar.jpg"
                                }
                                alt="Avatar"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="ml-3 flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap capitalize">
                                {data.com_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {getDocumentTypeNameById(data.documentTypeID)}
                          </p>
                        </td>
                         
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.documentID}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="flex-shrink-0 w-10 h-10">
                              <Image
                                className="w-full h-full rounded-full"
                                src={
                                  staffImage && staffImage.includes("https")
                                    ? staffImage
                                    : "/img/default-avatar.jpg"
                                }
                                alt="Avatar"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="ml-3 flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap capitalize">
                                {data.firstName} {data.lastName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.email}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.phone}
                          </p>
                        </td>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                            <div className="mr-2">
                                <div
                                  onClick={() => {
                                    setOpenModalMetadata(true)
                                  }}
                                  className="text-green-800 block text-sm  w-full text-center capitalize"
                                >
                                  <i className="fa fa-eye cursor-pointer"></i>
                                </div>
                          </div>
                        </td> */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <div className="flex">
                            <div className="mr-2">
                              <Dropdown
                                label=""
                                dismissOnClick={false}
                                renderTrigger={renderTrigger}
                              >
                                <Dropdown.Item
                                  onClick={() => {
                                    router.push(
                                      `./directory/files/${data.staff_id}`
                                    );
                                  }}
                                  className="text-green-800 block text-sm  w-full text-left capitalize"
                                >
                                  <i className="fa fa-eye"></i> Ver Archivos
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setOpenModalMetadata(true);
                                    setJsonResult(data.metadata);
                                  }}
                                  className="text-gray-800 block text-sm  w-full text-left capitalize"
                                >
                                  <i className="fa fa-eye"></i>{" "}
                                  {translations.metadata}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    editElement(data);
                                  }}
                                  className="text-green-800 block text-sm w-full text-left capitalize"
                                >
                                  <i className="fa fa-edit"></i>{" "}
                                  {translations.edit}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    deleteElement(data);
                                  }}
                                  className="text-red-800 block text-sm  w-full text-left capitalize"
                                >
                                  <i className="fa fa-trash"></i>{" "}
                                  {translations.delete}
                                </Dropdown.Item>
                              </Dropdown>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {externalTotalPages > 1 && (
                <div className="flex overflow-x-auto justify-end w-full mb-2 pr-2">
                  <Pagination
                    currentPage={externalCurrentPage}
                    totalPages={externalTotalPages}
                    previousLabel={translations.previous}
                    nextLabel={translations.next}
                    onPageChange={(page) =>
                      onExternalPageChange(externalElements, page)
                    }
                    showIcons
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Container className="!right-px !bottom-px z-10">
        <FAButton
          styles={{
            backgroundColor: darkColors.purple,
            color: lightColors.white,
          }}
          className="fab-item btn btn-link btn-lg text-white"
          tooltip="Actions"
          icon="fas fa-plus"
          rotate={true}
          onClick={() => {
            setDefaultValues();
            setStaff(null);
            setOpenModal(true);
          }}
        />
      </Container>
      <Modal
        show={openModal}
        onClose={() => {
          setDefaultValues();
          setOpenModal(false);
        }}
      >
        <Modal.Header className="">{translations.create_staff}</Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="flex items-center justify-center mb-4">
              <ClipLoader
                color={"#8049D7"}
                loading={isLoading}
                cssOverride={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
            <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="document_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tipo de documento
                  </label>
                  <Select
                          options={documentTypes}
                          components={{ Group }} value={documentType} onChange={(e)=>{
                            console.log(e)
                            setDocumentType(e)
                          }}>
                          
                          </Select>
                </div>
              </div>
             
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.id_label}
                  </label>
                  <input
                    value={documentId}
                    onChange={(event) => setdocumentId(event.target.value)}
                    type="text"
                    name="id"
                    id="id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.id_label}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.name}
                  </label>
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.name}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.last_name}
                  </label>
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.last_name}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.email}
                  </label>
                  <input
                    disabled={staff?.id}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className={`${
                      staff?.id
                        ? "border-red-300 bg-red-50 text-red-900"
                        : "border-gray-300 bg-gray-50 text-gray-900"
                    } ' border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'`}
                    placeholder={`${translations.email}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="workingCompany"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.company}
                  </label>
                  <input
                    value={workingCompany}
                    onChange={(event) => setWorkingCompany(event.target.value)}
                    type="text"
                    name="workingCompany"
                    id="workingCompany"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.company}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.phone}
                  </label>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.phone}`}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 mb-4 grid-cols-1">
                  {inputs.length !== 0 &&
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.metadata}
                  </label>
                  }
                  {inputs.map((input, index) => (
                    <div key={index} className="mb-1 grid gap-2 grid-cols-2">
                      <input
                        type="text"
                        placeholder="Key"
                        value={input.key}
                        onChange={(e) => handleChange(index, 'key', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      {/* </div>
                      <div key={index} className="mb-2"> */}
                      <input
                        type="text"
                        placeholder="Value"
                        value={input.value}
                        onChange={(e) => handleChange(index, 'value', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  ))}
              </div>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <div className="p-0">
                <button
                    onClick={addInput}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {inputs.length == 0 ? "agregar atributo" : "agregar otro"}
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between w-full">
            <Button
              color="gray"
              onClick={() => {
                setDefaultValues();
                setOpenModal(false);
              }}
              className=""
            >
              {translations.cancel}
            </Button>
            <Button
              onClick={saveElement}
              className="capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {saveButtonText}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={openModalMetadata}
        onClose={() => {
          setOpenModalMetadata(false);
        }}
      >
        <Modal.Header className="">{translations.view_metadata}</Modal.Header>
        <Modal.Body>
          {/* {JSON.stringify(jsonResult, 2)} */}
          <div className="p-4">
          {jsonResult ? (
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Clave
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(jsonResult).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {key}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : 
          <p>No found</p>
          }
        </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <div className="flex justify-between w-full">
            <Button
              color="gray"
              onClick={() => {
                setOpenModal(false);
              }}
              className=""
            >
              {translations.cancel}
            </Button>
          </div>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
