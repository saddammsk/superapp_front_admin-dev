import React, { useState } from 'react'
import { Button } from 'flowbite-react'
import Image from 'next/image'

export const RenderResponsibleBlock = ({
    options,
    image,
    fullname,
    rol,
    staff_id,
    blocks,
    onBlocksChange
}) => {
    const [blocksByUser, setBlocksByUser] = useState(blocks);

    return (
        <>
            <div className="flex gap-2 items-center rounded-lg border border-1 border-white hover:border-gray-500">
                {
                    options && (
                        <div className="col-span-2">
                            <select className="h-5/6 mb-2 bg-white border border-white text-gray-14000 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                {options.map((item, index) => {
                                    return (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    )
                }

                <div className="bg-white p-2 rounded-lg w-full h-full flex flex-col gap-2">
                    <div className="flex justify-between gap-6">
                        <div className="flex gap-2 flex-1">
                            <div className="flex items-center h-full flex gap-2 w-1/4">
                                <div>
                                    <Button size={'sm'} color="transparent" variant="danger" onClick={() => { console.log('edit') }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-move" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8" />
                                        </svg>
                                    </Button>
                                </div>
                                <div>
                                    <Image
                                        className="w-full h-full rounded-full"
                                        src={image || "/img/default-avatar.jpg"}
                                        alt="Avatar"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h5 className="text-sm font-semibold mb-0">{fullname}</h5>
                                    <span className="text-sm font-light">{fullname}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 w-3/4">
                                {blocksByUser.map((e, index) => {
                                    return (
                                        <Button key={index} color={'transparent'} size={'md'} className="p-0 w-auto border border-purple-600" onClick={() => {
                                            setBlocksByUser(blocksByUser.filter(b => b.id != e.id))
                                            onBlocksChange({
                                                staff_id,
                                                blocks: blocksByUser.filter(b => b.id != e.id)
                                            });
                                        }}>
                                            <div key={`${staff_id}-${index}`} className="rounded-md flex gap-2 items-center justify-between w-full">
                                                <div className="">
                                                    <span className="text-purple-600">{e.block_key}</span>
                                                </div>
                                                <div className="">
                                                    <span className="flex items-stretch transition-all duration-200 rounded-md">
                                                        <svg className="w-full" width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L1 7M1 1L7 7" stroke="black" strokeWidth="1.33333" strokeLinecap="currentColor" strokeLinejoin="round"></path></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </Button>)
                                })}
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <select
                                    onChange={(e) => {
                                        let _block = blocks.find(
                                            (element) => currentBlock.id == element.id
                                        );
                                        let index = blocks.findIndex(
                                            (element) => currentBlock.id == element.id
                                        );
                                        let _responsiblesBlock = [..._block.responsibles];
                                        let _currentResponsiblesBlock = _responsiblesBlock.find(
                                            (element) => element.staff_id == staff_id
                                        );
                                        let _currentResponsiblesBlockIndex = _responsiblesBlock.findIndex(
                                            (element) => element.staff_id == staff_id
                                        );
                                        _responsiblesBlock[_currentResponsiblesBlockIndex] = {
                                            ..._currentResponsiblesBlock,
                                            rol: e.target.value,
                                        };
                                        let _blocks = [...blocks];
                                        _blocks[index].responsibles = _responsiblesBlock;
                                        setBlocks(_blocks);
                                    }}
                                    value={rol}
                                    className="bg-white border border-1 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="approver">Aprobador</option>
                                    <option value="internal_reviewer">Revisor Interno</option>
                                </select>
                            </div>
                            <div className="flex">
                                <Button size={'sm'} color="transparent" variant="danger"
                                    onClick={() => { console.log('edit') }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </Button>
                                <Button size={'sm'} color="transparent" variant="danger"
                                    onClick={() => {
                                        setSelectedRecipientWizardForm([...selectedRecipientWizardForm.filter(e => { if (e.value != staff_id) return e })])
                                    }}
                                >
                                    <svg
                                        className="w-full h-3"
                                        width="8"
                                        height="8"
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 1L1 7M1 1L7 7"
                                            stroke="#6B7280"
                                            strokeWidth="1.33333"
                                            strokeLinecap="currentColor"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
