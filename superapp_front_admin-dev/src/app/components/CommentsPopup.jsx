'use client'
import { Fragment, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { getMessages } from '../../services/MessagesService'
import { useUserStore } from '@/store/UserStore'
import { shallow } from 'zustand/shallow'
import { generateSocket } from "../../utils/socket.config";
import { removeDuplicates } from '../../utils/removeDuplicate'
import { getDecodedToken } from '@/utils/utils'

const CommentsPopup = ({onHide, workflow_user_id}) => {
  const socket = generateSocket();
  const [chatsGroup, setChatsGrop] = useState([])
  const [comment, setComment] = useState("");
  const user = getDecodedToken();

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(workflow_user_id);
      setChatsGrop(data.data)
    })()
  }, [workflow_user_id])

  useEffect(() => {
    if (socket) {
      socket?.emit("joinChannel", workflow_user_id);
    }
  }, [workflow_user_id, socket]);

  useEffect(() => {
    if (socket) {
      socket?.on("Message", (obj) => {
        setChatsGrop((prev) => [...prev, obj]);
      });
    }
  }, [socket]);

  const sendMessage = (e) => {
    console.log('Clicked')
    if(e.key === "Enter"){
      socket.emit(
        "sendMessage",
        {
          message: e.target.value,
          channel: workflow_user_id,
          fullName: user.firstName + " " + user.lastName,
          identity: false,
          userid: user.staff_id,
          userPhoto: user?.image
        },
        (err) => {}
      );
      setComment("");
    }
  };

  const open = false
  let uniqueArray = removeDuplicates(chatsGroup, "id");

  return (
    <div className={`${open? 'hidden' : 'fixed'} w-screen h-screen z-50 top-0 flex justify-center p-6 items-center left-0 bg-transparent`}>
        <div className='w-full h-full absolute top-0 left-0 bg-black-1000 opacity-30'></div>
        <div className='relative w-full max-w-[800px] h-full max-h-[760px] z-50'>
        <div className='w-full bg-white border relative border-gray-1000 h-full rounded-lg md:p-6 p-4'>
              <div className=' absolute top-2 right-6 z-10'>

                <button onClick={onHide} className='items-center gap-4 text-sm font-semibold py-3 mb-3 inline-flex'>
                    <svg width="20" height="20" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.5L1 9.5M1 1.5L9 9.5" stroke="#000" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </button>
              </div>
              <h3 className=' font-semibold mb-6'>Commnets</h3>
              <h3 className=' font-semibold mb-6'>Workflow User Id {"->"} {workflow_user_id}</h3>
              <div className="w-full h-full flex flex-col">
                <Tab.Group>
                  <Tab.List className=" bg-gray-3000 inline-flex rounded-lg py-0.5 px-0.5 outline outline-1 outline-gray-1000">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={selected ? 'bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 px-5 w-1/3 py-3 block outline outline-1 outline-gray-1000' : 'bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3'}>
                          General
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={selected ? 'bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 md:px-5 px-2.5 w-1/3 py-3 block outline outline-1 outline-gray-1000' : 'bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3'}>
                          Internal
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={selected ? 'bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 md:px-5 px-2.5 w-1/3 py-3 block outline outline-1 outline-gray-1000' : 'bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3'}>
                          Documents
                        </button>
                      )}
                    </Tab>

                  </Tab.List>
                  <Tab.Panels className="outline-none lg:h-auto h-full">
                    <Tab.Panel className="outline-none lg:h-auto h-full">
                      <div className='w-full h-[calc(100vh-250px)] flex flex-col'>
                      <div className='w-full overflow-auto documents-overflow'>
                        <ul>
                          {uniqueArray?.map((chat, key) => (
                            <li key={key}>
                              <div className='p-3 border-b border-gray-1000'>
                                <div className='flex gap-3 items-center mb-2'>
                                  {/* <Image className=' w-8 h-8 rounded-full' src='/assets/images/assigned-img-1.png' alt="no-img" width={32} height={32} /> */}
                                  <div className='flex flex-col'>
                                    <h4 className='text-sm font-bold font-dm-sans'>{chat?.user}</h4>
                                    {/* <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p> */}
                                  </div>
                                </div>
                                <p className='text-xs font-dm-sans text-black-3000'>{chat?.message}</p>
                              </div>
                            </li>
                          ))}

                        </ul>
                      </div>

                      <div className='flex mt-6 px-4 h-14 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 z-10 bg-white'>
                        {/* <input type="text" className='w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm' placeholder='Leave comment' /> */}
                        <input
                          type="text"
                          className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                          placeholder="Leave comment"
                          value={comment}
                          onChange={(val) => setComment(val.target.value)}
                          onKeyDown={sendMessage}
                        />
                      </div>
                        </div>

                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="outline-none">
                    <Tab.Panel className="outline-none ">
                      <div className='h-full'>
                        <div className='w-full h-full max-h-[490px] overflow-auto documents-overflow'>
                          <ul>
                          {uniqueArray?.map((chat, key) => chat?.accId == user?.acc_id && (
                            <li key={key}>
                              <div className='p-3 border-b border-gray-1000'>
                                <div className='flex gap-3 items-center mb-2'>
                                  {/* <Image className=' w-8 h-8 rounded-full' src='/assets/images/assigned-img-1.png' alt="no-img" width={32} height={32} /> */}
                                  <div className='flex flex-col'>
                                    <h4 className='text-sm font-bold font-dm-sans'>{chat?.user}</h4>
                                    {/* <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p> */}
                                  </div>
                                </div>
                                <p className='text-xs font-dm-sans text-black-3000'>{chat?.message}</p>
                              </div>
                            </li>
                          ))}
                          </ul>
                        </div>
                        <div className='flex  mt-6 px-4 h-14 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 z-10 bg-white'>
                          <input
                            type="text"
                            className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder="Leave comment"
                            value={comment}
                            onChange={(val) => setComment(val.target.value)}
                            onKeyDown={sendMessage}
                          />  
                        </div>
                      </div>

                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels className="outline-none h-full">
                    <Tab.Panel className="outline-none h-full">
                      <div className='h-full flex flex-col justify-between py-6 pb-10'>
                        <div className='w-full h-full lg:max-h-[541px] max-h-[500px] overflow-auto documents-overflow'>
                          <ul className='border mb-3 border-gray-1000 p-4 rounded-md'>
                            <li>
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                      Do you offer technical support?
                                      <ChevronRightIcon className={` w-4 h-4 ${open ? '-rotate-90 transform' : 'rotate-90 transform'}`} />
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                      <div className='p-3 mt-4 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-4.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>Bank of America</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Reviewer</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>Sure, tell me which part of the 2nd page?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3  font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </li>
                          </ul>
                          <ul className='border mb-3 border-gray-1000 p-4 rounded-md'>
                            <li>
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                      Some Document
                                      <ChevronRightIcon className={` w-4 h-4 ${open ? '-rotate-90 transform' : 'rotate-90 transform'}`} />
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                      <div className='p-3 mt-4 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-4.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>Bank of America</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Reviewer</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>Sure, tell me which part of the 2nd page?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3  font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </li>
                          </ul>
                          <ul className='border mb-3 border-gray-1000 p-4 rounded-md'>
                            <li>
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                      Some Other Document
                                      <ChevronRightIcon className={` w-4 h-4 ${open ? '-rotate-90 transform' : 'rotate-90 transform'}`} />
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                      <div className='p-3 mt-4 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3 border-b border-gray-1000 font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-4.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>Bank of America</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Reviewer</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>Sure, tell me which part of the 2nd page?</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='p-3  font-dm-sans'>
                                        <div className='flex gap-3 items-center mb-2'>
                                          <Image className=' w-8 h-8 rounded-full' src='/assets/images/user-img-2.png' alt="no-img" width={32} height={32} />
                                          <div className='flex flex-col'>
                                            <h4 className='text-sm font-bold font-dm-sans'>José Noel Barrios</h4>
                                            <p className='text-xs font-dm-sans text-gray-2000'>Signer ⏤ Tesla</p>
                                          </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                          <div className='tag flex gap-2 items-center'>
                                            <p className='text-xs'>I have a little problem here in 2nd page of this document, can you help?</p>
                                          </div>
                                        </div>
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </li>
                          </ul>
                        </div>
                        <div className='flex mt-6 px-4 h-16 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 bg-white mb-10'>
                          <input
                            type="text"
                            className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder="Leave comment"
                            value={comment}
                            onChange={(val) => setComment(val.target.value)}
                            onKeyDown={sendMessage}
                          />
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

              </div>
            </div>
        </div>
    </div>
  )
}

export default CommentsPopup;