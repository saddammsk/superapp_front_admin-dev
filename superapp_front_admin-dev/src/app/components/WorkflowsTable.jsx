'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Pagination } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import copy from 'clipboard-copy';
import { TOTAL_PAGES_PAGINATION } from '@/consts';
import { useAppStore } from '@/store/AppStore';
import { useWorkflowStore } from '@/store/WorkflowStore';
import { useWorkflowEmissionStore } from '@/store/WorkflowEmissionStore';
import Image from 'next/image';
import moment from 'moment';
import {
    Container,
    Button as FAButton,
    lightColors,
    darkColors,
  } from 'react-floating-action-button';
  import * as XLSX from 'xlsx';


export default function WorkflowsTable({ lng, headers, translations }) {
    const {
        search
    } = useAppStore((state) => ({
        search: state.search
    }));

    const {
        setCurrentWorkflow,
    } = useWorkflowStore((state) => ({
        setCurrentWorkflow: state.setCurrentWorkflow
    }));

    const {
        workflowEmissionsHistory,
        getWorkflowEmissionsHistory
    } = useWorkflowEmissionStore((state) => ({
        workflowEmissionsHistory: state.workflowEmissionsHistory,
        getWorkflowEmissionsHistory: state.getWorkflowEmissionsHistory
    }));

    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [elements, setElements] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [emissionName, setEmissionName] = useState('');
    const [workflowKey, setWorkflowKey] = useState('');
    const [statusFlow, setStatusFlow] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [staffName, setStaffName] = useState('');
    const [identityStaff, setIdentityStaff] = useState('');
    const [startIndex, setStartIndex] = useState(1);
    const [finalIndex, setFinalIndex] = useState(TOTAL_PAGES_PAGINATION);
    const [firstRender, setFirstRender] = useState(true);

    const onPageChange = (data, page) => {
        // const startIndex = (page - 1) * TOTAL_PAGES_PAGINATION;
        // const finalIndex = page * TOTAL_PAGES_PAGINATION;
        setStartIndex((page - 1) * TOTAL_PAGES_PAGINATION);
        setFinalIndex(page * TOTAL_PAGES_PAGINATION);
        // setPaginatedData(data.slice(startIndex, finalIndex));
        setCurrentPage(page);
    };

    const handleCopyClick = async (data) => {
        const baseUrl = process.env.BASE_URL;
        if (baseUrl && lng && data.workflow_user_id) {
            try {
                await copy(`${baseUrl}/${lng}/admin/home/otp-request/${data.workflow_user_id}`);
                toast.success(`MagicLink copiado en portapapeles`);
            } catch (error) {
                console.error('Failed to copy text to clipboard', error);
            }
        }
    };

    useEffect(() => {
        const result = workflowEmissionsHistory.sort((a, b) => new Date(b.date_create) - new Date(a.date_create));
        setElements(result);
        onPageChange(result, 1);
        setTotalPages(Math.ceil(result.length / TOTAL_PAGES_PAGINATION));
    }, [workflowEmissionsHistory]);

    useEffect(() => {
        const fetchElements = async () => {
            setIsLoading(true);
            await getWorkflowEmissionsHistory(`:40002/workflow/v1/users/ByAccId?accId=${user.acc_id}`);
            setIsLoading(false);
        };

        if (user?.acc_id) {
            fetchElements();
        }
    }, [user]);

    useEffect(() => {
        let filtered = elements;

        if (emissionName != '') {
            filtered = filtered.filter((data) =>
                data.emission_name && data.emission_name.toLowerCase().includes(emissionName.toLowerCase())
            );
        }
        if (workflowKey != '') {
            filtered = filtered.filter((data) =>
                data.workflow_key && data.workflow_key.toLowerCase().includes(workflowKey.toLowerCase())
            );
        }
        if (selectedStatuses.length > 0) {
            filtered = filtered.filter((item) => {
                const statusUpper = item.StatusMessage ? item.StatusMessage.toUpperCase() : '';
                const isIncluded = selectedStatuses.includes(statusUpper);
                return isIncluded;
            });
        }
        if (staffName != '') {
            filtered = filtered.filter((data) =>
                data.staff_id && data.staff_id.some((item) =>
                    `${item.firstName} ${item.lastName}`.toLowerCase().includes(staffName.toLowerCase())
                )
            );
        }
        if (identityStaff != '') {
            filtered = filtered.filter((data) =>
                data.staff_id && data.staff_id.some((item) =>
                    item?.documentID?.toLowerCase().includes(identityStaff.toLowerCase())
                )
            );
        }
        if (searchInput != '') {
            filtered = filtered.filter((data) => {
                return (
                    (data.emission_name && data.emission_name.toLowerCase().includes(searchInput.toLowerCase())) ||
                    (data.workflow_key && data.workflow_key.toLowerCase().includes(searchInput.toLowerCase())) ||
                    (data.StatusMessage && data.StatusMessage.toLowerCase().includes(searchInput.toLowerCase())) ||
                    (data.staff_id && data.staff_id.some((item) =>
                        `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchInput.toLowerCase()))
                    ) ||
                    (data.staff_id && data.staff_id.some((item) =>
                        item?.documentID?.toLowerCase().includes(searchInput.toLowerCase()))
                    )
                );
            });
        }

        setSortedData(filtered);
        setTotalPages(Math.ceil(filtered.length / TOTAL_PAGES_PAGINATION));
        // onPageChange(filtered, 1);
    }, [searchInput, emissionName, workflowKey, selectedStatuses, staffName, elements, identityStaff]);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        setUser(decodedToken ? JSON.parse(decodedToken) : null);
        return () => {
            console.log("Workflows desmontado");
        };
    }, []);


    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        sort();
    };

    const sort = () => {
        let dataToSort = [...sortedData]; // Clonamos paginatedData para no mutarlo directamente
        if (sortField === 'staff_id' && sortOrder) {
            dataToSort.sort((a, b) => {
                const nameA = a.staff_id.map(item => `${item.firstName} ${item.lastName}`).join(' ').toLowerCase();
                const nameB = b.staff_id.map(item => `${item.firstName} ${item.lastName}`).join(' ').toLowerCase();
                let comparison = 0;
                if (nameA > nameB) {
                    comparison = 1;
                } else if (nameA < nameB) {
                    comparison = -1;
                }
                return sortOrder === 'asc' ? comparison : comparison * -1;
            });
        } 
        if (sortField === 'identity_document' && sortOrder) {
            dataToSort.sort((a, b) => {
                const nameA = a.staff_id.map(item => item.documentID ? item.documentID : "");
                const nameB = b.staff_id.map(item => item.documentID ? item.documentID : "");
                let comparison = 0;
                if (nameA > nameB) {
                    comparison = 1;
                } else if (nameA < nameB) {
                    comparison = -1;
                }
                return sortOrder === 'asc' ? comparison : comparison * -1;
            });
        } else if (sortField === 'time_elapsed' && sortOrder) {
            dataToSort.sort((a, b) => {
                const timeA = calculateTimeElapsed(a);
                const timeB = calculateTimeElapsed(b);
                let comparison = 0;
                if (timeA > timeB) {
                    comparison = 1;
                } else if (timeA < timeB) {
                    comparison = -1;
                }
                return sortOrder === 'asc' ? comparison : comparison * -1;
            });
        } else if (sortField && sortOrder) {
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
    };


    const calculateTimeElapsed = (data) => {
        if (data?.StatusMessage !== 'COMPLETED') {
            return `${moment().diff(moment(data.date_create), 'hours')} hrs`;
        } else {
            return `${moment(data.date_create).diff(data.date_last_updated, 'hours')} hrs ${moment(data.date_last_updated).diff(data.date_create, 'minutes')} mins`;
        }
    };

    const handleGeneralInputChange = (e) => {
        setSearchInput(e.target.value);
        setEmissionName('');
        setWorkflowKey('');
        setSelectedStatuses([]);
        setStaffName('');
    };

    const handleStatusChange = (status) => {
        setSelectedStatuses((prevStatuses) =>
            prevStatuses.includes(status)
                ? prevStatuses.filter((s) => s !== status)
                : [...prevStatuses, status]
        );
        setSearchInput('');
    };

    const statuses = ['COMPLETED', 'INPROCESS', 'PENDING', 'SUBMITTED', 'TOBECORRECTED', 'CORRECTED', 'REJECTED'];

    const formatDuration = (duration) => {
        const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
        const minutes = String(duration.minutes()).padStart(2, '0');
        const seconds = String(duration.seconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };

    
    const compareValues = (a, b, key, isString = false) => {
        const valueA = isString ? a[key].toLowerCase() : a[key];
        const valueB = isString ? b[key].toLowerCase() : b[key];
        if (valueA > valueB) return 1;
        if (valueA < valueB) return -1;
        return 0;
    };
    
    const filterData = (data, filters) => {
        return data.filter(item => {
            const meetsEmissionName = filters.emissionName ? item.emission_name?.toLowerCase().includes(filters.emissionName.toLowerCase()) : true;
            const meetsWorkflowKey = filters.workflowKey ? item.workflow_key?.toLowerCase().includes(filters.workflowKey.toLowerCase()) : true;
            const meetsStatusFlow = filters.selectedStatuses.length > 0 ? filters.selectedStatuses.includes(item.StatusMessage?.toUpperCase()) : true;
            const meetsStaffName = filters.staffName ? item.staff_id?.some(staff => `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(filters.staffName.toLowerCase())) : true;
            const meetsSearchInput = filters.searchInput ? (
                item.emission_name?.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
                item.workflow_key?.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
                item.StatusMessage?.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
                item.staff_id?.some(staff => `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(filters.searchInput.toLowerCase()))
            ) : true;
    
            return meetsEmissionName && meetsWorkflowKey && meetsStatusFlow && meetsStaffName && meetsSearchInput;
        });
    };
    
    const DownloadExcel = () => {
        const dataToSort = [...elements];
        
        if (sortField && sortOrder) {
            dataToSort.sort((a, b) => {
                let comparison;
                if (sortField === 'staff_id') {
                    const nameA = a.staff_id.map(item => `${item.firstName} ${item.lastName}`).join(' ').toLowerCase();
                    const nameB = b.staff_id.map(item => `${item.firstName} ${item.lastName}`).join(' ').toLowerCase();
                    comparison = compareValues({nameA}, {nameB}, 'nameA', true);
                } else if (sortField === 'time_elapsed') {
                    const timeA = calculateTimeElapsed(a);
                    const timeB = calculateTimeElapsed(b);
                    comparison = compareValues({timeA}, {timeB}, 'timeA');
                } else {
                    comparison = compareValues(a, b, sortField, typeof a[sortField] === 'string');
                }
                return sortOrder === 'asc' ? comparison : comparison * -1;
            });
        }
    
        const filters = {
            emissionName,
            workflowKey,
            selectedStatuses,
            staffName,
            searchInput
        };

        
        const filtered = filterData(dataToSort, filters);
    
        const organizedData = filtered.map((data) => {
            const staffNames = data.staff_id ? data.staff_id.map(item => `${item.firstName} ${item.lastName}`).join(', ') : '';
            const timeDifference = data?.StatusMessage !== 'COMPLETED' 
                ? formatDuration(moment.duration(moment().diff(moment(data.date_create))))
                : formatDuration(moment.duration(moment(data.date_last_updated).diff(moment(data.date_create))));
            const submittedCount = `${data.data.filter((e) => e.status_block === 'SUBMITTED').length}/${data.data.length}`;
    
            return {
                [translations.emmision_name]: data.emission_name,
                [translations.workflows]: data.workflow_key,
                [translations.recipients]: staffNames,
                [translations.time_elapsed]: timeDifference,
                [translations.status]: translations[data.StatusMessage],
                [translations.progress]: submittedCount
            };
        });
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(organizedData);

        const range = XLSX.utils.decode_range(ws['!ref']);
    
        // ancho
        const colWidths = new Array(range.e.c + 1).fill({ wpx: 200 });
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, "Export");
        XLSX.writeFile(wb, 'export.xlsx');
    };

    console.log(elements)
    

    return (
        <>
            <div className="container mx-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center mb-4">
                        <ClipLoader
                            color={'#8049D7'}
                            loading={isLoading}
                            cssOverride={true}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div className="-mx-4 sm:-mx-8 px-0 lg:px-6 py-4 overflow-x-auto">
                        <Container className='!right-px !bottom-px z-10'>
                            <FAButton
                            styles={{
                                backgroundColor: darkColors.green,
                                color: lightColors.white,
                            }}
                            className='fab-item btn btn-link btn-lg text-white'
                            tooltip='Download Excel'
                            icon="fa-solid fa-download"
                            rotate={true}
                            onClick={() => DownloadExcel()}
                            />
                    </Container>
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
                            <table className="min-w-full leading-normal min-h-80">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                            
                                        >
                                            <span className="block" onClick={() => handleSort('emission_name')}>{translations.emmision_name}
                                            {sortField === 'emission_name' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            </span>
                                            <input type="text" className="px-2 py-1 rounded border border-gray-300"  value={emissionName}
                                                onChange={(e) => {
                                                    setEmissionName(e.target.value);
                                                    setSearchInput('');
                                                }}/>
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        >
                                            <span className="block" onClick={() => handleSort('workflow_key')}>{translations.workflows}
                                            {sortField === 'workflow_key' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            </span>
                                            <input type="text" className="px-2 py-1 rounded border border-gray-300" 
                                                value={workflowKey}
                                                onChange={(e) => {
                                                    setWorkflowKey(e.target.value);
                                                    setSearchInput('');
                                                }}
                                            />
                                        </th>
                                       
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        >
                                            <span className="block" onClick={() => handleSort('staff_id')}>{translations.recipients}
                                            {sortField === 'staff_id' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            </span>
                                            <input type="text" className="px-2 py-1 rounded border border-gray-300" 
                                                value={staffName}
                                                onChange={(e) => {
                                                    setStaffName(e.target.value);
                                                    setSearchInput('');
                                                }}/>
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        >
                                            <span className="block" onClick={() => handleSort('identity_document')}>{translations.identity_document}
                                            {sortField === 'identity_document' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            </span>
                                            <input type="text" className="px-2 py-1 rounded border border-gray-300" 
                                                value={identityStaff}
                                                onChange={(e) => {
                                                    setIdentityStaff(e.target.value);
                                                    setSearchInput('');
                                                    onPageChange(elements, 1)
                                                }}/>
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                        >
                                            <span className="block" onClick={() => handleSort('time_elapsed')}>{translations.time_elapsed}
                                            {sortField === 'time_elapsed' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            </span>
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                                            <span className="block" onClick={() => handleSort('StatusMessage')}>{translations.status}
                                            {sortField === 'StatusMessage' && (
                                                <i className={`fas fa-caret-${sortOrder === 'asc' ? 'up' : 'down'} ml-2`} />
                                            )}
                                            <div className="relative inline-block">
                                                <button
                                                    className="ml-2 text-gray-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const dropdown = document.getElementById('dropdownStatus');
                                                        dropdown.classList.toggle('hidden');
                                                    }}
                                                >
                                                    <i className="fas fa-filter" />
                                                </button>
                                                <div
                                                    id="dropdownStatus"
                                                    className="hidden absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto"
                                                >
                                                    <ul className="p-2 z-40">
                                                        {statuses.map((status) => (
                                                            <li key={status} className="flex items-center p-2">
                                                                <input
                                                                    type="checkbox"
                                                                    value={status}
                                                                    checked={selectedStatuses.includes(status)}
                                                                    onChange={() => handleStatusChange(status)}
                                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                                />
                                                                <label htmlFor={status} className="ml-2 text-sm">
                                                                    {translations[status]}
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            </span>
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            {translations.progress}
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            {translations.action}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData
                                    .slice(startIndex, finalIndex)
                                    .map((data, index) => {
                                        let status_color = 'rejected';
                                        if (data?.StatusMessage === 'SUBMITTED') {
                                            status_color = 'completed';
                                            } else if (data?.StatusMessage === 'INPROCESS') {
                                            status_color = 'assigned';
                                            } else if (data?.StatusMessage === 'COMPLETED') {
                                            status_color = 'completed';
                                            }else if (data?.StatusMessage === 'TOBECORRECTED') {
                                                status_color = 'toBeCORRECTED';
                                            }else if (data?.StatusMessage === 'CORRECTED') {
                                                status_color = 'corrected';
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {data.emission_name}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {data.workflow_key}
                                                        </p>
                                                    </td>
                                                   
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            {data.staff_id &&
                                                                data.staff_id.map((item, index) => (
                                                                    <div key={index} className="flex items-center">
                                                                        <span className="text-gray-900 whitespace-no-wrap">
                                                                            {item.firstName} {item.lastName}
                                                                        </span>
                                                                        {index !== data.staff_id.length - 1 && (
                                                                            <span>, </span>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            {data.staff_id &&
                                                                data.staff_id.map((item, index) => (
                                                                    <div key={index} className="flex items-center">
                                                                        <span className="text-gray-900 whitespace-no-wrap">
                                                                            {item.documentID}
                                                                        </span>
                                                                        {index !== data.staff_id.length - 1 && (
                                                                            <span>, </span>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {data?.StatusMessage !== 'COMPLETED' ? (
                                                        `${formatDuration(moment.duration(moment().diff(moment(data.date_create))))}`
                                                    ) : (
                                                        `${formatDuration(moment.duration(moment(data.date_last_updated).diff(moment(data.date_create))))} `
                                                    )}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <span
                                                                className={`relative inline-block px-3 py-1 font-semibold text-${status_color} leading-tight`}
                                                            >
                                                                <span
                                                                    aria-hidden
                                                                    className={`absolute inset-0 bg-${status_color} opacity-50 rounded-full`}
                                                                ></span>
                                                                <span className="relative uppercase">
                                                                    {translations[data.StatusMessage]}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {`${data.data.filter((e) => e.status_block === 'SUBMITTED').length}/${data.data.length}`}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                        <div className="flex">
                                                            <div className="mr-2">
                                                                <button
                                                                    type="button"
                                                                    className="inline-block text-gray-500 hover:text-gray-700 px-5 py-5"
                                                                >
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                </button>
                                                            </div>
                                                            <div className="mr-2">
                                                                <button
                                                                    onClick={() => handleCopyClick(data)}
                                                                    type="button"
                                                                    className="inline-block text-gray-500 hover:text-gray-700 px-5 py-5"
                                                                >
                                                                    <i className="fa fa-solid fa-share"></i>
                                                                </button>
                                                            </div>
                                                            <div className="mr-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setCurrentWorkflow(data);
                                                                        router.push(`./history/review/${data.workflow_user_id}`);
                                                                    }}
                                                                    type="button"
                                                                    className="inline-block text-gray-500 hover:text-gray-700 px-5 py-5"
                                                                >
                                                                    <i className="fa fa-solid fa-eye"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {totalPages > 1 && (
                                    <div className="flex overflow-x-auto justify-end w-full mt-2 mb-2 pr-2">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            previousLabel={translations.previous}
                                            nextLabel={translations.next}
                                            onPageChange={(page) => onPageChange(elements, page)}
                                            showIcons
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }        
