"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { Button, Modal, Pagination, Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  Container,
  Button as FAButton,
  lightColors,
  darkColors,
} from "react-floating-action-button";
import { WORKFLOW_DATA, TOTAL_PAGES_PAGINATION } from "@/consts";
import { post, put, _delete } from "@/services/RestService";
import { useAppStore } from "@/store/AppStore";
import { useDynamicParamStore } from "@/store/DynamicParamsStore";
import { useRouter } from "next/navigation";
import Select, { components, GroupProps } from 'react-select';
import Link from "next/link";
import { ArrowDownTray } from "./icons/arrow-down-tray";

export default function DynamicParamsTable({ headers, translations }) {
  const { search } = useAppStore((state) => ({
    search: state.search,
  }));

  const router = useRouter();

  const { dynamicParams, getDynamicParams } = useDynamicParamStore(
    (state) => ({
      dynamicParams: state.dynamicParams,
      getDynamicParams: state.getDynamicParams,
    })
  );


  const [externalElements, setExternalElements] = useState([]);
  const [paginatedExternalData, setPaginatedExternalData] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAddCSV, setOpenModalAddCSV] = useState(false);

  
  // fields to edit
  const [type, setType] = useState(null);
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [saveButtonText, setSaveButtonText] = useState("");
  const [staff, setStaff] = useState(null);
  // -- end


  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  /* paginacion */
  const [externalCurrentPage, setExternalCurrentPage] = useState(0);
  const [externalTotalPages, setExternalTotalPages] = useState(1);
  
    /* paginacion */
  const onExternalPageChange = (data, page) => {
    const startIndex = (page - 1) * TOTAL_PAGES_PAGINATION;
    const finalIndex = page * TOTAL_PAGES_PAGINATION;

    setPaginatedExternalData(data.slice(startIndex, finalIndex));
    setExternalCurrentPage(page);
  };
  // end

  const [typesParams, setTypesParams] = useState([{label: "number", value: "number"}, {label: "text", value: "text"}]);



  /* headers */
  const [nameH, setNameH] = useState('');
  const [keyH, setKeyH] = useState('');
  const [typeH, setTypeH] = useState('');
  const [valueH, setValueH] = useState('');


  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          processFileData(results.data);
        },
        error: (error) => {
          console.error('Error reading CSV file:', error);
        },
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Convert worksheet to JSON
        const headers = worksheet[0];
        const rows = worksheet.slice(1);
        const jsonData = rows.map(row => {
          const rowData = {};
          row.forEach((value, index) => {
            rowData[headers[index]] = value;
          });
          return rowData;
        });

        processFileData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Unsupported file type. Please upload a CSV or XLSX file.');
    }
  };

  const processFileData = (data) => {
    const headerMapping = {
      'Identificador': 'key',
      'nombre': 'name',
      'tipo': 'type',
      'valor por defecto': 'default_value'
    };

    const requiredKeys = ['key', 'name', 'type'];

    const cleanedData = data.filter(row => {
      const isEmpty = Object.values(row).every(value => value === null || value === '');
      return !isEmpty;
    }).map(row => {
      const cleanedRow = {};
      for (const key in headerMapping) {
        cleanedRow[headerMapping[key]] = row[key] !== undefined ? row[key] : null;
      }
      return cleanedRow;
    });

    const isValid = cleanedData.every(row =>
      requiredKeys.every(key => key in row)
    );

    if (!isValid) {
      setCsvData(null);
    } else {
      setCsvData(cleanedData);
    }
  };

  const saveElementCSV = async () => {
    if (!csvData) {
      alert('Please upload a CSV file first.');
      return;
    }
    // console.log(csvData)
    const body = {
      data: csvData
    };
    try {
      const { data } = await post(`:40004/admin/v1/globalProperty/${user.acc_id}`, body);
      if (data.success) {
        toast.success(`Operación satisfactoria`);
        setOpenModalAddCSV(false);
        fetchElements();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Verifica el archivo ingresado, al parecer algo fallo con el archivo o con el servidor")
    }
  };


  const setDefaultValues = async () => {
    setType(null);
    setLabel("");
    setKey("");
    setValue("");
  };

  const saveElement = async () => {
    if (user?.acc_id && key && type) {
      if (staff?.id) {
        const body = {
          key: key,
          default_value: value,
          name: label,
          type: type.value,
        };
        try {
          const { data } = await put(
            `:40004/admin/v1/globalProperty/${staff.id}`,
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
          data: [
            {
              key: key,
              default_value: value,
              name: label,
              type: type.value,
            }
          ]    
        };
        try {
          const { data } = await post(`:40004/admin/v1/globalProperty/${user.acc_id}`, body);
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
          `:40004/admin/v1/globalProperty/${user.acc_id}/${element.id}`
        );
        if (data.success) {
          toast.success(`Operación satisfactoria`);
          fetchElements();
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Hay un problema al eliminar, por favor intentar mas tarde")
      }
    }
  };

  const editElement = async (element) => {
    
    setStaff(element);
    if (element && staff && element?.id == staff?.id) {
      setType(element.type ? {label: element.type, value: element.type } : null);
      setLabel(element.name ? element.name : "");
      setKey(element.key ? element.key : "");
      setValue(element.default_value ? element.default_value : "");
      setOpenModal(true);
    }
  };

  const fetchElements = async () => {
    getDynamicParams(`:40004/admin/v1/globalProperty/${user.acc_id}`);
  };

  useEffect(() => {
    if (user?.acc_id) {
      /* fetch elements */
      fetchElements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

 

  useEffect(() => {
    if (dynamicParams) {
      setExternalElements(dynamicParams);
      onExternalPageChange(dynamicParams, 1);
      setExternalTotalPages(
        Math.ceil(dynamicParams.length / TOTAL_PAGES_PAGINATION)
      );
    }
  }, [dynamicParams]);

  console.log(dynamicParams)

  useEffect(() => {
    if (staff) {
      setType(staff.type ? {label: staff.type, value: staff.type } : null)
      setLabel(staff.name ? staff.name : "");
      setKey(staff.key ? staff.key : "");
      setValue(staff.default_value ? staff.default_value : "");
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
      console.log("Usuario cargado");
    };
  }, []);


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
    if (sortField && sortOrder) {
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

  if (nameH) {
      filtered = externalElements.filter((data) =>
          data.name && data.name.toLowerCase().includes(nameH.toLowerCase())
      );
  }else if (keyH) {
      filtered = externalElements.filter((data) =>
          data.key && data.key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(keyH.toLowerCase())
      );
  }else if (typeH) {
    filtered = externalElements.filter((data) =>
        data.type && data.type.toLowerCase().includes(typeH.toLowerCase())
    );
  }else if (valueH) {
    filtered = externalElements.filter((data) =>
        data.default_value && data.default_value.toLowerCase().includes(valueH.toLowerCase())
    );
  }else if (searchInput) {
    filtered = externalElements.filter((e) => {
      if (
        (e.name && e.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.key && e.key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.type && e.type.toLowerCase().includes(searchInput.toLowerCase())) ||
        (e.default_value && e.default_value.toLowerCase().includes(searchInput.toLowerCase()))
      )
        return e;
    });
    
  }

  setPaginatedExternalData(filtered);
    setExternalTotalPages(Math.ceil(filtered.length / TOTAL_PAGES_PAGINATION));
    onExternalPageChange(filtered, 1);
}, [searchInput, nameH, keyH, typeH, valueH, externalElements]);


const handleGeneralInputChange = (e) => {
  setSearchInput(e.target.value);
  setNameH('');
  setKeyH('');
  setTypeH('');
  setValueH('')
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
                      onChange={handleGeneralInputChange}
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
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('name')}>{translations.label}
                        {sortField === 'name' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={nameH}
                            onChange={(e) => {
                                setNameH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('key')}>{translations.key}
                        {sortField === 'key' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={keyH}
                            onChange={(e) => {
                                setKeyH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('type')}>{translations.type}
                        {sortField === 'type' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={typeH}
                            onChange={(e) => {
                                setTypeH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span className="block" onClick={() => handleSort('default_value')}>{translations.value}
                        {sortField === 'default_value' && (
                            <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                        )}
                        </span>
                        <input type="text" className="max-w-48 px-2 py-1 rounded border border-gray-300"  value={valueH}
                            onChange={(e) => {
                                setValueH(e.target.value);
                                setSearchInput('');
                            }}/>
                    </th>
                    
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        
                    >
                        <span onClick={() => handleSort('emission_name')}>{translations.action}</span>
                        
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((data, index) => {
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
                            <div className="ml-3 flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap capitalize">
                                {data.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.key}
                          </p>
                        </td>
                         
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.type}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="ml-3 flex items-center">
                              <p className="text-gray-900 whitespace-no-wrap capitalize">
                                {data.default_value}
                              </p>
                            </div>
                          </div>
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
              backgroundColor: darkColors.green,
              color: lightColors.white,
            }}
            className="fab-item btn btn-link btn-lg text-white"
            tooltip="Import CSV"
            icon="fa-solid fa-file-arrow-up"
            rotate={true}
            onClick={() => {
              setOpenModalAddCSV(true);
            }}
          />
        <FAButton
          styles={{
            backgroundColor: darkColors.purple,
            color: lightColors.white,
          }}
          className="fab-item btn btn-link btn-lg text-white"
          tooltip={translations.create_param}
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
        <Modal.Header className="">{translations.create_param}</Modal.Header>
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
                    htmlFor="label"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.label}
                  </label>
                  <input
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    type="text"
                    name="label"
                    id="label"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.label}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="key"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.key}
                  </label>
                  <input
                    value={key}
                    onChange={(event) => setKey(event.target.value)}
                    type="text"
                    name="key"
                    id="key"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.key}`}
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="document_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.type}
                  </label>
                  <Select
                    options={typesParams}
                    components={{ Group }} value={type} onChange={(e)=>{
                      setType(e)
                    }}>
                    
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="value"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translations.value}
                  </label>
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    type="text"
                    name="value"
                    id="value"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={`${translations.value}`}
                  />
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
        show={openModalAddCSV}
        onClose={() => {
          setOpenModalAddCSV(false);
        }}
      >
        <Modal.Header>{translations.view_metadata}</Modal.Header>
        <Modal.Body>
        <div className="flex items-center justify-center space-x-4">
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <Link
            href={process.env.NEXT_PUBLIC_EXCEL_TEMPLATE_URL}
            target="_blank"
            title="Descargue su plantilla"
          >
            <button className="flex items-center bg-green-500 transition p-2 rounded-lg hover:bg-green-600 dark:bg-green-400">
              <ArrowDownTray
                className="w-5 h-5 text-white"
                strokeWidth={3}
              />
            </button>
          </Link>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between w-full">
            <Button
              color="gray"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              {translations.cancel}
            </Button>
            <Button
              onClick={saveElementCSV}
              className="capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              
              {translations.import}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
