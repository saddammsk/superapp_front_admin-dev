'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Image from 'next/image';
import NotificacionesForm from './NotificacionesForm';


export default function WorkflowsDisclosure() {
  return (
    <div className="font-dm-sans">
    <div className="">
      <Disclosure as="div" className="border border-gray-1000 rounded-lg p-2 mb-1.5">
        <DisclosureButton className="group flex items-center gap-[20px] justify-between w-full text-start">
          <div className='flex items-center gap-[20px]'>
          <span className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99984 11.3333V12C5.99984 12.5304 6.21055 13.0391 6.58562 13.4142C6.9607 13.7893 7.4694 14 7.99984 14C8.53027 14 9.03898 13.7893 9.41405 13.4142C9.78912 13.0391 9.99984 12.5304 9.99984 12V11.3333M6.6665 3.33333C6.6665 2.97971 6.80698 2.64057 7.05703 2.39052C7.30708 2.14048 7.64622 2 7.99984 2C8.35346 2 8.6926 2.14048 8.94265 2.39052C9.19269 2.64057 9.33317 2.97971 9.33317 3.33333C10.0988 3.69535 10.7514 4.25888 11.2212 4.96353C11.691 5.66818 11.9601 6.48738 11.9998 7.33333V9.33333C12.05 9.7478 12.1968 10.1447 12.4284 10.4921C12.66 10.8395 12.9699 11.1276 13.3332 11.3333H2.6665C3.0298 11.1276 3.33971 10.8395 3.5713 10.4921C3.80288 10.1447 3.94967 9.7478 3.99984 9.33333V7.33333C4.03954 6.48738 4.3087 5.66818 4.77847 4.96353C5.24824 4.25888 5.9009 3.69535 6.6665 3.33333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </span>
          <span className="text-15 font-medium text-black-3000">
          Notificaciones predeterminadas
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L12 15L6 9" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="pl-[15px] pr-[9px] mt-2">
            <div className="w-full border-t border-gray-1000"></div>
          <div className='pt-[13px]'>
            <h2 className='text-15 text-black-3000 font-bold mb-[33px] font-dm-sans'>CONTRATACIÓN</h2>
         
            <div className='w-full'>
              <div className='mb-[22px]'>
                <div className='flex items-center gap-2.5'>
                <h3 className='text-15 font-bold text-black-3000 '>Notificaciones</h3>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1C8.7615 1 11 3.2385 11 6C11.001 7.31274 10.4858 8.57322 9.56545 9.50932C8.64512 10.4454 7.39357 10.982 6.08101 11.0033C4.76845 11.0246 3.50017 10.5288 2.55 9.623C1.59983 8.71721 1.04399 7.47408 1.0025 6.162L1 6L1.002 5.86C1.076 3.1635 3.285 1 6 1ZM6 7.5C5.87753 7.50002 5.75933 7.54498 5.66781 7.62636C5.5763 7.70774 5.51783 7.81987 5.5035 7.9415L5.5 8L5.5035 8.0635C5.51795 8.18503 5.57648 8.29703 5.66798 8.37829C5.75949 8.45956 5.87762 8.50444 6 8.50444C6.12238 8.50444 6.24051 8.45956 6.33202 8.37829C6.42352 8.29703 6.48204 8.18503 6.4965 8.0635L6.5 8.005L6.4965 7.9415C6.48217 7.81987 6.4237 7.70774 6.33219 7.62636C6.24067 7.54498 6.12247 7.50002 6 7.5ZM6.684 4.1635C6.38469 4.01048 6.04244 3.96317 5.71284 4.02925C5.38325 4.09534 5.08569 4.27093 4.8685 4.5275C4.78569 4.6245 4.74308 4.74948 4.74939 4.87687C4.7557 5.00425 4.81045 5.12441 4.90243 5.21276C4.99442 5.3011 5.11669 5.35096 5.24423 5.35212C5.37176 5.35328 5.49492 5.30566 5.5885 5.219L5.674 5.129C5.74776 5.06129 5.8405 5.0178 5.93973 5.0044C6.03896 4.99099 6.13991 5.0083 6.229 5.054C6.32504 5.10261 6.40283 5.18091 6.45081 5.27727C6.49879 5.37363 6.51439 5.48289 6.49529 5.58883C6.47619 5.69476 6.42342 5.79171 6.34481 5.86524C6.26621 5.93878 6.16597 5.98499 6.059 5.997L5.943 6.003C5.81583 6.01699 5.69886 6.0792 5.61617 6.17682C5.53347 6.27444 5.49135 6.40005 5.49846 6.52779C5.50557 6.65553 5.56137 6.77569 5.65439 6.86353C5.74741 6.95137 5.87056 7.00021 5.9985 7C6.33581 7.00101 6.66362 6.88831 6.92899 6.68007C7.19436 6.47184 7.3818 6.18024 7.46103 5.85237C7.54027 5.52449 7.50668 5.17948 7.3657 4.87305C7.22471 4.56661 6.98455 4.31664 6.684 4.1635Z" fill="#0CAF60"/>
                </svg>

                </div>
                <p className='text-15 text-black-3000 mt-1'>Seleccione como desea notificar a los participantes en los distintos tipos de notificaciones.</p>
              </div>

              <div className='w-full'>
               <NotificacionesForm/>
              </div>

              <div className='w-full pt-3 pb-1 flex items-center justify-end mt-[72px] border-t border-gray-1000'>
              <a href="#" className="flex w-full max-w-[302px] items-center font-dm-sans gap-10 px-[60px] text-center md:text-15 text-sm text-green-2000 border border-green-3000 rounded-lg py-3 font-bold">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7175 7.99999H1.28249M8 1.28247V14.7175" stroke="#0CAF60" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Nuevo bloque
              </a>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure as="div" className="border border-gray-1000 rounded-lg p-2 mb-1.5">
        <DisclosureButton className="group flex items-center gap-[20px] justify-between w-full text-start">
          <div className='flex items-center gap-[20px]'>
          <span className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            </span>
          <span className="text-15 font-medium text-black-3000">
          Responsables del flujo de trabajo
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L12 15L6 9" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="lg:pl-[15px] pr-[9px] mt-2">
        <div className="w-full border-t border-gray-1000"></div>
          <div className='pt-[13px] lg:pl-[35px]'>
            <h2 className='text-15 text-black-3000 font-bold mb-2.5 font-dm-sans'>CONTRATACIÓN</h2>
            <div className='flex items-center justify-end gap-2 mb-6'>
              <button className='w-[30px] h-[30px] flex items-center justify-center border border-purple-1000 rounded-lg'>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12H4V10H16V12ZM2 12H0V10H2V12ZM16 7H4V5H16V7ZM2 7H0V5H2V7ZM16 2H4.023V0H16V2ZM2 2H0V0H2V2Z" fill="#6247CD"/>
              </svg>
              </button>

              <button className='w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14H8V8H14V14ZM6 14H0V8H6V14ZM14 6H8V0H14V6ZM6 6H0V0H6V6Z" fill="currentColor"/>
              </svg>
              </button>
            </div>
            <div className='w-full pl-[11px]'>
              <h2 className='text-xs text-black-3000 font-bold mb-4 font-dm-sans'>Responsables</h2>
            <div className='w-full '>
              <div className="w-full grid 3xl:grid-cols-5 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-2.5">
                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px]'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-1.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Joseph Smith</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>josephsmith@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>2 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>KYC y 1 más...</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px]'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-2.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Sara Havok</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>sarahavok@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>2 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>Pago y 1 más...</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px]'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-3.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Jorge Valverde</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>jorgev@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>1 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>Formulario</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px]'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-4.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Vanesa Castillo</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>vanesacast@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>1 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>Adjunto</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px]'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-5.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Jhon Pugh</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>jhonp@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>1 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>Notificación</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

                <div className='w-full border border-gray-1000 relative rounded-lg px-2.5 pb-3 pt-[25px] mt-1'>
                <button className="w-[30px] absolute right-2.5 top-3 h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3333 14.6666H4.66667C3.93029 14.6666 3.33333 14.0696 3.33333 13.3333V4.66659H2V3.33325H4.66667V2.66659C4.66667 1.93021 5.26362 1.33325 6 1.33325H10C10.7364 1.33325 11.3333 1.93021 11.3333 2.66659V3.33325H14V4.66659H12.6667V13.3333C12.6667 14.0696 12.0697 14.6666 11.3333 14.6666ZM4.66667 4.66659V13.3333H11.3333V4.66659H4.66667ZM6 2.66659V3.33325H10V2.66659H6ZM10 11.9999H8.66667V5.99992H10V11.9999ZM7.33333 11.9999H6V5.99992H7.33333V11.9999Z" fill="#232323"/>
                </svg>

                </button>
                  <div className="w-full flex items-center justify-center">
                  <Image
                    className=" w-[77px] object-cover h-[77px] rounded-full"
                    src="/assets/images/disclosure-card-img-6.png"
                    alt="no-img"
                    width={77}
                    height={77}
                      />
                  </div>

                  <div className="w-full mt-3 px-[5px]">
                    <ul>
                      <li className='flex items-center gap-1.5 mb-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14V12.6667C4 11.9594 4.28095 11.2811 4.78105 10.781C5.28115 10.281 5.95942 10 6.66667 10H9.33333C10.0406 10 10.7189 10.281 11.219 10.781C11.719 11.2811 12 11.9594 12 12.6667V14M5.33333 4.66667C5.33333 5.37391 5.61428 6.05219 6.11438 6.55229C6.61448 7.05238 7.29276 7.33333 8 7.33333C8.70724 7.33333 9.38552 7.05238 9.88562 6.55229C10.3857 6.05219 10.6667 5.37391 10.6667 4.66667C10.6667 3.95942 10.3857 3.28115 9.88562 2.78105C9.38552 2.28095 8.70724 2 8 2C7.29276 2 6.61448 2.28095 6.11438 2.78105C5.61428 3.28115 5.33333 3.95942 5.33333 4.66667Z" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        <h3 className='text-15 text-black-3000 font-medium font-dm-sans'>Yolanda Herrera</h3>
                      </li>

                      <li className='flex items-center gap-1.5'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659M2 4.66659V11.3333C2 11.6869 2.14048 12.026 2.39052 12.2761C2.64057 12.5261 2.97971 12.6666 3.33333 12.6666H12.6667C13.0203 12.6666 13.3594 12.5261 13.6095 12.2761C13.8595 12.026 14 11.6869 14 11.3333V4.66659M2 4.66659L8 8.66658L14 4.66659" stroke="#6247CD" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </span>
                        <h3 className='text-xs text-gray-2000 font-dm-sans'>yoliherrera@mail.com</h3>
                      </li>
                    </ul>
                    <div className='w-full border-t border-gray-1000 my-[11px]'></div>
                    <div className='px-1.5'>
                      <p className='text-xs text-gray-17000 font-medium'>1 Tareas</p>
                      <div className='flex items-center gap-6 h-9 mt-0.5'>
                      <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.0180664" width="26.7273" height="30" rx="6" fill="white"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.71484 10.6667L8.71484 11.6667L10.3815 10M7.71484 14.6667L8.71484 15.6667L10.3815 14M7.71484 18.6667L8.71484 19.6667L10.3815 18M12.7148 11H18.7148M12.7148 15H18.7148M12.7148 19H18.7148" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                          <h4 className='text-xs text-black-3000 font-semibold'>Formulario</h4>
                      </div>

                      <div className='w-full border-t border-gray-1000 '></div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

              <div className='w-full pt-3 pb-1 flex items-center justify-end mt-[72px] border-t border-gray-1000'>
              <a href="#" className="flex w-full max-w-[302px] items-center font-dm-sans gap-10 px-[60px] text-center md:text-15 text-sm text-green-2000 border border-green-3000 rounded-lg py-3 font-bold">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7175 7.99999H1.28249M8 1.28247V14.7175" stroke="#0CAF60" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Nuevo bloque
              </a>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure as="div" className="border border-gray-1000 rounded-lg p-2 mb-1.5" defaultOpen={true}>
        <DisclosureButton className="group flex items-center gap-[20px] justify-between w-full text-start">
          <div className='flex items-center gap-[20px]'>
          <span className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            </span>

          <span className="text-15 font-medium text-black-3000">
            Bloques
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L12 15L6 9" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="pl-[15px] pr-[9px] mt-2">
        <div className="w-full border-t border-gray-1000"></div>
          <div className='pt-[13px]'>
            <h2 className='text-15 text-black-3000 font-bold mb-2.5 font-dm-sans'>CONTRATACIÓN</h2>
            <div className='flex items-center justify-end gap-2 mb-6'>
              <button className='w-[30px] h-[30px] flex items-center justify-center border border-purple-1000 rounded-lg'>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12H4V10H16V12ZM2 12H0V10H2V12ZM16 7H4V5H16V7ZM2 7H0V5H2V7ZM16 2H4.023V0H16V2ZM2 2H0V0H2V2Z" fill="#6247CD"/>
              </svg>
              </button>

              <button className='w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14H8V8H14V14ZM6 14H0V8H6V14ZM14 6H8V0H14V6ZM6 6H0V0H6V6Z" fill="currentColor"/>
              </svg>
              </button>
            </div>
            <div className='w-full overflow-auto '>
              <table className="table w-full lg:min-w-[830px] min-w-[800px]">
                <thead className='pb-3'>
                  <tr>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans text-start px-2.5 pb-3'>Tipo de bloque</th>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans text-start pb-3 3xl:px-[22px] px-3'>Responsables</th>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans text-start pb-3 3xl:px-[22px] px-3'>Nombre</th>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans text-start pb-3 3xl:px-[22px] px-3'>Descripción</th>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans text-start pb-3 3xl:px-[22px] px-3'>Llave</th>
                    <th className='text-xs font-bold text-black-3000 font-dm-sans pb-3 px-[22px] text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>1</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 5.33329H11.3333M10 7.99996H11.3333M4.66667 10.6666H11.3333M2 4.66663C2 4.13619 2.21071 3.62749 2.58579 3.25241C2.96086 2.87734 3.46957 2.66663 4 2.66663H12C12.5304 2.66663 13.0391 2.87734 13.4142 3.25241C13.7893 3.62749 14 4.13619 14 4.66663V11.3333C14 11.8637 13.7893 12.3724 13.4142 12.7475C13.0391 13.1226 12.5304 13.3333 12 13.3333H4C3.46957 13.3333 2.96086 13.1226 2.58579 12.7475C2.21071 12.3724 2 11.8637 2 11.3333V4.66663ZM4.66667 6.66663C4.66667 7.02025 4.80714 7.35939 5.05719 7.60943C5.30724 7.85948 5.64638 7.99996 6 7.99996C6.35362 7.99996 6.69276 7.85948 6.94281 7.60943C7.19286 7.35939 7.33333 7.02025 7.33333 6.66663C7.33333 6.313 7.19286 5.97387 6.94281 5.72382C6.69276 5.47377 6.35362 5.33329 6 5.33329C5.64638 5.33329 5.30724 5.47377 5.05719 5.72382C4.80714 5.97387 4.66667 6.313 4.66667 6.66663Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-1.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>Joseph Smith</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>KYC</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Adjunta tu documento de identidad.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>KYC</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>2</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3332 5.33329V3.33329C11.3332 3.15648 11.2629 2.98691 11.1379 2.86189C11.0129 2.73686 10.8433 2.66663 10.6665 2.66663H3.99984C3.64622 2.66663 3.30708 2.8071 3.05703 3.05715C2.80698 3.3072 2.6665 3.64634 2.6665 3.99996M2.6665 3.99996C2.6665 4.35358 2.80698 4.69272 3.05703 4.94277C3.30708 5.19282 3.64622 5.33329 3.99984 5.33329H11.9998C12.1766 5.33329 12.3462 5.40353 12.4712 5.52856C12.5963 5.65358 12.6665 5.82315 12.6665 5.99996V7.99996M2.6665 3.99996V12C2.6665 12.3536 2.80698 12.6927 3.05703 12.9428C3.30708 13.1928 3.64622 13.3333 3.99984 13.3333H11.9998C12.1766 13.3333 12.3462 13.2631 12.4712 13.138C12.5963 13.013 12.6665 12.8434 12.6665 12.6666V10.6666M13.3332 7.99996V10.6666H10.6665C10.3129 10.6666 9.97374 10.5262 9.7237 10.2761C9.47365 10.0261 9.33317 9.68691 9.33317 9.33329C9.33317 8.97967 9.47365 8.64053 9.7237 8.39048C9.97374 8.14044 10.3129 7.99996 10.6665 7.99996H13.3332Z" stroke="#232323" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-2.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>Sara Havok</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>Pago</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Paga el seguro.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>Pago</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>3</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4M6 4V12M6 4C6 3.46957 5.78929 2.96086 5.41421 2.58579C5.03914 2.21071 4.53043 2 4 2M6 12C6 12.5304 6.21071 13.0391 6.58579 13.4142C6.96086 13.7893 7.46957 14 8 14M6 12C6 12.5304 5.78929 13.0391 5.41421 13.4142C5.03914 13.7893 4.53043 14 4 14M8.66667 4.66667H13.3333C13.5101 4.66667 13.6797 4.7369 13.8047 4.86193C13.9298 4.98695 14 5.15652 14 5.33333V10.6667C14 10.8435 13.9298 11.013 13.8047 11.1381C13.6797 11.2631 13.5101 11.3333 13.3333 11.3333H8.66667M3.33333 4.66667H2.66667C2.48986 4.66667 2.32029 4.7369 2.19526 4.86193C2.07024 4.98695 2 5.15652 2 5.33333V10.6667C2 10.8435 2.07024 11.013 2.19526 11.1381C2.32029 11.2631 2.48986 11.3333 2.66667 11.3333H3.33333M11.3333 8H11.34M8.66667 8H8.67333" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul className='flex items-center'>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-3.1.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                          <li className='-ml-2'>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-3.2.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                      
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>Jorge Valverde y 1 más</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>Formulario</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Llena el formulario de apertura.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>Formulario inicial</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>4</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.0003 4.66656L5.66696 8.9999C5.40174 9.26511 5.25274 9.62482 5.25274 9.9999C5.25274 10.375 5.40174 10.7347 5.66696 10.9999C5.93217 11.2651 6.29188 11.4141 6.66696 11.4141C7.04203 11.4141 7.40174 11.2651 7.66696 10.9999L12.0003 6.66656C12.5307 6.13613 12.8287 5.41671 12.8287 4.66656C12.8287 3.91642 12.5307 3.19699 12.0003 2.66656C11.4699 2.13613 10.7504 1.83813 10.0003 1.83813C9.25015 1.83813 8.53072 2.13613 8.00029 2.66656L3.66696 6.9999C2.87131 7.79554 2.42432 8.87468 2.42432 9.9999C2.42432 11.1251 2.87131 12.2042 3.66696 12.9999C4.46261 13.7955 5.54174 14.2425 6.66696 14.2425C7.79218 14.2425 8.87131 13.7955 9.66696 12.9999L14.0003 8.66656" stroke="#232323" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul className='flex items-center'>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-4.1.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                          <li className='-ml-2'>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-1.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                          <li className='-ml-2'>
                            <div className='w-6 h-6 flex items-center justify-center rounded-full bg-purple-1000 text-white text-[10px] font-medium text-center'>
                              <p>+1</p>
                            </div>
                          </li>
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>Vanesa Castillo y 2 más</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>Adjunto</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Adjunta tu documento de Lorem Ipsum.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>Adjuntar documentos</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>5</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.33317 3L11.9998 7.66667L9.33317 10.3333M0.666504 12.3333L1.84517 11.1546M1.88525 11.1147C2.06032 11.2898 2.26819 11.4288 2.49696 11.5236C2.72574 11.6183 2.97095 11.6671 3.21858 11.6671C3.46621 11.6671 3.71142 11.6183 3.9402 11.5236C4.16897 11.4288 4.37684 11.2898 4.55191 11.1147L11.6092 4.05738C11.7331 3.93356 11.8314 3.78655 11.8984 3.62475C11.9655 3.46295 12 3.28952 12 3.11438C12 2.93924 11.9655 2.76582 11.8984 2.60401C11.8314 2.44221 11.7331 2.2952 11.6092 2.17138L10.8286 1.39072C10.7048 1.26685 10.5578 1.16859 10.3959 1.10155C10.2341 1.03451 10.0607 1 9.88558 1C9.71044 1 9.53701 1.03451 9.37521 1.10155C9.21341 1.16859 9.0664 1.26685 8.94258 1.39072L1.88525 8.44805C1.71012 8.62313 1.57119 8.83099 1.47641 9.05977C1.38163 9.28854 1.33285 9.53375 1.33285 9.78138C1.33285 10.029 1.38163 10.2742 1.47641 10.503C1.57119 10.7318 1.71012 10.9396 1.88525 11.1147Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.33317 3L11.9998 7.66667L9.33317 10.3333M0.666504 12.3333L1.84517 11.1546M1.88525 11.1147C2.06032 11.2898 2.26819 11.4288 2.49696 11.5236C2.72574 11.6183 2.97095 11.6671 3.21858 11.6671C3.46621 11.6671 3.71142 11.6183 3.9402 11.5236C4.16897 11.4288 4.37684 11.2898 4.55191 11.1147L11.6092 4.05738C11.7331 3.93356 11.8314 3.78655 11.8984 3.62475C11.9655 3.46295 12 3.28952 12 3.11438C12 2.93924 11.9655 2.76582 11.8984 2.60401C11.8314 2.44221 11.7331 2.2952 11.6092 2.17138L10.8286 1.39072C10.7048 1.26685 10.5578 1.16859 10.3959 1.10155C10.2341 1.03451 10.0607 1 9.88558 1C9.71044 1 9.53701 1.03451 9.37521 1.10155C9.21341 1.16859 9.0664 1.26685 8.94258 1.39072L1.88525 8.44805C1.71012 8.62313 1.57119 8.83099 1.47641 9.05977C1.38163 9.28854 1.33285 9.53375 1.33285 9.78138C1.33285 10.029 1.38163 10.2742 1.47641 10.503C1.57119 10.7318 1.71012 10.9396 1.88525 11.1147Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>


                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-2.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>Sara Havok</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>Firma de documento</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Firma el contrato.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>Firma contrato</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr className='h-[60px] w-full border-b border-gray-1000'>
                    <td scope="row" className='px-2'>
                      <div className='flex items-center md:gap-4 gap-2'>
                      <div className='inline-flex w-fit 3xl:px-4 px-2 py-1 3xl:gap-4 gap-2 items-center border border-gray-1000 rounded-md'>
                        <p className='text-xs font-bold text-black-3000'>6</p>
                        <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                      </div>

                      <div className='w-[30px] h-[30px] rounded-md border border-gray-1000 flex items-center justify-center p-1'>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10.3333V11C5 11.5304 5.21071 12.0391 5.58579 12.4142C5.96086 12.7893 6.46957 13 7 13C7.53043 13 8.03914 12.7893 8.41421 12.4142C8.78929 12.0391 9 11.5304 9 11V10.3333M13 3.48467C12.5627 2.5335 11.9278 1.68646 11.1374 1M1 3.48467C1.4369 2.53363 2.07143 1.6866 2.86133 1M5.66667 2.33333C5.66667 1.97971 5.80714 1.64057 6.05719 1.39052C6.30724 1.14048 6.64638 1 7 1C7.35362 1 7.69276 1.14048 7.94281 1.39052C8.19286 1.64057 8.33333 1.97971 8.33333 2.33333C9.09894 2.69535 9.7516 3.25888 10.2214 3.96353C10.6911 4.66818 10.9603 5.48738 11 6.33333V8.33333C11.0502 8.7478 11.197 9.14471 11.4285 9.49208C11.6601 9.83946 11.97 10.1276 12.3333 10.3333H1.66667C2.02996 10.1276 2.33987 9.83946 2.57146 9.49208C2.80304 9.14471 2.94983 8.7478 3 8.33333V6.33333C3.03971 5.48738 3.30887 4.66818 3.77863 3.96353C4.2484 3.25888 4.90106 2.69535 5.66667 2.33333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      </div>

                      </div>
               
                    </td>
                    <td className='3xl:px-[22px] xl:px-4 px-3'>
                      <div className='flex items-center gap-3'>
                        <ul>
                          <li>
                          <Image
                          className=" min-w-6 h-6 rounded-full"
                          src="/assets/images/table-img-6.png"
                          alt="no-img"
                          width={24}
                          height={24}
                            />
                          </li>
                        </ul>
                
                      <h4 className='text-xs text-black-4000'>John Pugh</h4>

                      </div>
                    </td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-semibold text-xs'><h4>Notificación</h4></td>
                    <td className='3xl:px-[22px] px-3 text-gray-11000 font-semibold text-[10px]'><p>Finaliza el trámite.</p></td>
                    <td className='3xl:px-[22px] px-3 text-black-3000 font-normal text-xs'><h4>Notificación</h4></td>
                    <td className=' text-black-3000 font-semibold text-xs'>
                      <ul className='flex items-center gap-2.5 justify-end pr-2'>
                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00008 4.33329L11.6667 6.99996M2.66675 13.3333H5.33341L12.3334 6.33333C12.687 5.97971 12.8857 5.50009 12.8857 5C12.8857 4.4999 12.687 4.02029 12.3334 3.66666C11.9798 3.31304 11.5002 3.11438 11.0001 3.11438C10.5 3.11438 10.0204 3.31304 9.66675 3.66666L2.66675 10.6667V13.3333Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="#232323" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.66675 6.66667H13.3334M2.66675 9.33333H13.3334M6.00008 12L8.00008 14L10.0001 12M6.00008 4L8.00008 2L10.0001 4" stroke="black" strokeOpacity="0.2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </button>
                        </li>

                        <li>
                        <button className="w-[30px] h-[30px] flex items-center justify-center border border-gray-1000 rounded-lg text-gray-2000 transition-all duration-300 hover:border-purple-1000 hover:text-purple-1000">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0698 3.33333 13.3334V4.66671H2V3.33337H4.66667V2.66671C4.66667 1.93033 5.26362 1.33337 6 1.33337H10C10.7364 1.33337 11.3333 1.93033 11.3333 2.66671V3.33337H14V4.66671H12.6667V13.3334C12.6667 14.0698 12.0697 14.6667 11.3333 14.6667ZM4.66667 4.66671V13.3334H11.3333V4.66671H4.66667ZM6 2.66671V3.33337H10V2.66671H6ZM10 12H8.66667V6.00004H10V12ZM7.33333 12H6V6.00004H7.33333V12Z" fill="#232323"/>
                        </svg>

                        </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  
             
                </tbody>
              </table>
            </div>
            <div className='w-full pt-3 pb-1 flex items-center justify-end mt-[72px] border-t border-gray-1000'>
              <a href="#" className="flex w-full max-w-[302px] items-center font-dm-sans gap-10 px-[60px] text-center md:text-15 text-sm text-green-2000 border border-green-3000 rounded-lg py-3 font-bold">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7175 7.99999H1.28249M8 1.28247V14.7175" stroke="#0CAF60" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Nuevo bloque
              </a>
              </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
  )
}
