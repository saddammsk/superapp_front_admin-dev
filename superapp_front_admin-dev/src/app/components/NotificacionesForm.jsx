
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


const NotificacionesForm = () => {
  return (
    <div>
        <form>
        <ul className='py-2 w-full grid xl:grid-cols-4 sm:grid-cols-2 gap-2 max-w-[943px]'>
        <li>
          <input type="radio" name="title" id="radio" value={"Solicitud"} className="notifi-radio hidden checked:!bg-purple-2000 !border-none appearance-none rounded-lg !ring-0 !ring-offset-0 !shadow-none !outline-none !bg-transparent "  />
        <label htmlFor="radio" className="flex items-center justify-center gap-2.5 overflow-hidden text-gray-12000 rounded-lg border border-gray-9000 relative h-[46px] w-full">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 17V18C9.5 18.7956 9.81607 19.5587 10.3787 20.1213C10.9413 20.6839 11.7044 21 12.5 21C13.2956 21 14.0587 20.6839 14.6213 20.1213C15.1839 19.5587 15.5 18.7956 15.5 18V17M10.5 5C10.5 4.46957 10.7107 3.96086 11.0858 3.58579C11.4609 3.21071 11.9696 3 12.5 3C13.0304 3 13.5391 3.21071 13.9142 3.58579C14.2893 3.96086 14.5 4.46957 14.5 5C15.6484 5.54303 16.6274 6.38833 17.3321 7.4453C18.0367 8.50227 18.4404 9.73107 18.5 11V14C18.5753 14.6217 18.7954 15.2171 19.1428 15.7381C19.4902 16.2592 19.9551 16.6914 20.5 17H4.5C5.04494 16.6914 5.50981 16.2592 5.85719 15.7381C6.20457 15.2171 6.42474 14.6217 6.5 14V11C6.55956 9.73107 6.9633 8.50227 7.66795 7.4453C8.3726 6.38833 9.35159 5.54303 10.5 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          <span>Solicitud</span>
        </label> 
        </li>
           <li>
          <input type="radio" name="title" value={"Completado"} id="radio-1" className="notifi-radio hidden checked:!bg-purple-2000 !border-none appearance-none rounded-lg !ring-0 !ring-offset-0 !shadow-none !outline-none !bg-transparent "  />
        <label htmlFor="radio-1" className="flex items-center justify-center gap-2.5 overflow-hidden text-gray-12000 rounded-lg border border-gray-9000 relative h-[46px] w-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12L10 17L20 7" stroke="#ABACC5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Completado</span>
        </label> 
        </li>
        <li>
          <input type="radio" name="title" value={"Aprobado"}  id="radio-2" className="notifi-radio hidden checked:!bg-purple-2000 !border-none appearance-none rounded-lg !ring-0 !ring-offset-0 !shadow-none !outline-none !bg-transparent "  />
        <label htmlFor="radio-2" className="flex items-center justify-center gap-2.5 overflow-hidden text-gray-12000 rounded-lg border border-gray-9000 relative h-[46px] w-full">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 12L12.5 17L22.5 7M2.5 12L7.5 17M12.5 12L17.5 7" stroke="#ABACC5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

          <span>Aprobado</span>
        </label> 
        </li>
        <li>
          <input type="radio" name="title" value={"Rechazado"}  id="radio-3" className="notifi-radio hidden checked:!bg-purple-2000 !border-none appearance-none rounded-lg !ring-0 !ring-offset-0 !shadow-none !outline-none !bg-transparent "  />
        <label htmlFor="radio-3" className="flex items-center justify-center gap-2.5 overflow-hidden text-gray-12000 rounded-lg border border-gray-9000 relative h-[46px] w-full">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.20001 3.69995L16.8 16.3M1.5 10C1.5 11.1819 1.73279 12.3522 2.18508 13.4442C2.63738 14.5361 3.30031 15.5282 4.13604 16.364C4.97177 17.1997 5.96392 17.8626 7.05585 18.3149C8.14778 18.7672 9.3181 19 10.5 19C11.6819 19 12.8522 18.7672 13.9442 18.3149C15.0361 17.8626 16.0282 17.1997 16.864 16.364C17.6997 15.5282 18.3626 14.5361 18.8149 13.4442C19.2672 12.3522 19.5 11.1819 19.5 10C19.5 8.8181 19.2672 7.64778 18.8149 6.55585C18.3626 5.46392 17.6997 4.47177 16.864 3.63604C16.0282 2.80031 15.0361 2.13738 13.9442 1.68508C12.8522 1.23279 11.6819 1 10.5 1C9.3181 1 8.14778 1.23279 7.05585 1.68508C5.96392 2.13738 4.97177 2.80031 4.13604 3.63604C3.30031 4.47177 2.63738 5.46392 2.18508 6.55585C1.73279 7.64778 1.5 8.8181 1.5 10Z" stroke="#ABACC5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

          <span>Rechazado</span>
        </label> 
        </li>
   
        </ul>

        <div className="max-w-[705px] w-full mt-3.5 mb-[34px]">
          <h3 className="text-purple-1000 text-15 font-bold">Notificaciones de solicitud</h3>
          <p className="text-black-3000 text-15">Los firmantes recibirán esta notificación cuando se les envíe la solicitud.</p>
        </div>

        <div>
        <Disclosure as="div" className="disclosure-form  rounded-lg mb-1.5" defaultOpen={true}>
        <DisclosureButton className="group flex items-center gap-[20px] rounded-lg justify-between w-full p-2 text-purple-1000 bg-purple-2000">
          <div className='flex items-center gap-[20px]'>
          <span className='rounded-md flex items-center justify-center'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            </span>
          <span className="text-15 font-bold">
          E-mail
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10L12 16L18 10H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="xl:pl-10 mt-[17px]">
          <div className='w-full'>
            <div className="w-full flex items-center md:flex-row flex-col  gap-6 justify-between border border-gray-1000 rounded-lg px-6 2xl:h-9 py-2 lg:py">
                <div className='flex item-center gap-4 '>
                  <button>
                  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9L1 5M1 5L5 1M1 5H12C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H11" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </button>

                  <button>
                  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9L16 5M16 5L12 1M16 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9C1 10.0609 1.42143 11.0783 2.17157 11.8284C2.92172 12.5786 3.93913 13 5 13H6" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div>
                  <ul className='flex items-center flex-wrap justify-center md:gap-1.5 gap-2'>
                    <li className='mr-5 inline-flex items-center justify-center'>
                    <Menu>
                      <MenuButton className={'text-15 font-dm-sans text-black-3000 inline-flex items-center gap-1.5'}>
                      Sans Serif
                        <span>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1H1Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        </MenuButton>
                      <MenuItems className={'bg-gray-100 flex items-start flex-col min-w-24 gap-1 text-start rounded shadow mt-2 py-2'} anchor="bottom">
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                            Font 1
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 2
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 3
                          </a>
                        </MenuItem>
                      </MenuItems>
                   </Menu>
                    </li>

                    <li className='inline-flex items-center justify-center'>
                    <Menu>
                      <MenuButton className={'text-15 font-dm-sans text-black-3000 inline-flex items-center gap-1.5'}>
                        <span>
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 3V1H14V3M8 1V15M10 15H6M13 9V8H19V9M16 8V15M15 15H17" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        <span>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1H1Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        </MenuButton>
                      <MenuItems className={'bg-gray-100 flex items-start flex-col min-w-24 gap-1 text-start rounded shadow mt-2 py-2'} anchor="bottom">
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                            Font 1
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 2
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 3
                          </a>
                        </MenuItem>
                      </MenuItems>
                   </Menu>
                    </li>

                    <li className='3xl:ml-10 xl:ml-3 ml-0 inline-flex items-center justify-center'>
                      <button>
                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8C7.92826 8 8.8185 7.63125 9.47487 6.97487C10.1313 6.3185 10.5 5.42826 10.5 4.5C10.5 3.57174 10.1313 2.6815 9.47487 2.02513C8.8185 1.36875 7.92826 1 7 1H1V8M7 8H1M7 8H8C8.92826 8 9.8185 8.36875 10.4749 9.02513C11.1313 9.6815 11.5 10.5717 11.5 11.5C11.5 12.4283 11.1313 13.3185 10.4749 13.9749C9.8185 14.6313 8.92826 15 8 15H1V8" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                    </li>

                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H17M7 19H13M14 5L10 19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                      </li>

                      
                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                      </button>
                      </li>

                      
                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 15V8C9 7.20435 9.31607 6.44129 9.87868 5.87868C10.4413 5.31607 11.2044 5 12 5C12.7956 5 13.5587 5.31607 14.1213 5.87868C14.6839 6.44129 15 7.20435 15 8V15M9 11H15M5 19H19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 3xl:ml-9 xl:ml-3 ml-0'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 8H15.01M3 16L8 11C8.928 10.107 10.072 10.107 11 11L16 16M14 14L15 13C15.928 12.107 17.072 12.107 18 13L21 16M3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.9999 6.99996L8.49995 13.5C8.10212 13.8978 7.87863 14.4374 7.87863 15C7.87863 15.5626 8.10212 16.1021 8.49995 16.5C8.89777 16.8978 9.43734 17.1213 9.99995 17.1213C10.5626 17.1213 11.1021 16.8978 11.4999 16.5L17.9999 9.99996C18.7956 9.20432 19.2426 8.12518 19.2426 6.99996C19.2426 5.87475 18.7956 4.79561 17.9999 3.99996C17.2043 3.20432 16.1252 2.75732 14.9999 2.75732C13.8747 2.75732 12.7956 3.20432 11.9999 3.99996L5.49995 10.5C4.30647 11.6934 3.63599 13.3121 3.63599 15C3.63599 16.6878 4.30647 18.3065 5.49995 19.5C6.69342 20.6934 8.31212 21.3639 9.99995 21.3639C11.6878 21.3639 13.3065 20.6934 14.4999 19.5L20.9999 13" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C19.995 7.58378 16.4162 4.00496 12 4ZM12 18C10.42 18.0267 8.9266 17.28 8 16C7.55008 15.3983 7.21141 14.721 7 14H17C17 14 17 14 17 14.008C16.7853 14.7252 16.4469 15.3994 16 16C15.0733 17.2799 13.5799 18.0266 12 18ZM8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5C10 11.3284 9.32843 12 8.5 12ZM15.493 11.986C14.6684 11.986 14 11.3176 14 10.493C14 9.66844 14.6684 9 15.493 9C16.3176 9 16.986 9.66844 16.986 10.493C16.9849 11.3171 16.3171 11.9849 15.493 11.986Z" fill="#4F4F4F"/>
                      </svg>

                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 3xl:ml-9 xl:ml-3 ml-0'>
                      <Menu>
                      <MenuButton className={'text-15 font-dm-sans text-black-3000 inline-flex items-center'}>
                        <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H14M4 18H18" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                        </span>
                        <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10L12 16L18 10H6Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        </MenuButton>
                      <MenuItems className={'bg-gray-100 flex items-start flex-col min-w-20 gap-1 text-start rounded shadow mt-2 py-2'} anchor="bottom">
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                            Font 1
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 2
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="text-sm hover:text-purple-1000 px-2 text-start" href="#">
                          Font 3
                          </a>
                        </MenuItem>
                      </MenuItems>
                   </Menu>
                
                      </li>

                      <li className='inline-flex items-center justify-center ml-4 mr-2.5'>
                        <button>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3H17M8 9H17M9 15H17M1 13C1 12.4696 1.21071 11.9609 1.58579 11.5858C1.96086 11.2107 2.46957 11 3 11C3.53043 11 4.03914 11.2107 4.41421 11.5858C4.78929 11.9609 5 12.4696 5 13C5 13.591 4.5 14 4 14.5L1 17H5M3 7V1L1 3" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>
                      </li>

                      <li className='inline-flex items-center justify-center'>
                        <button>
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1H16M5 7H16M5 13H16M1 1V1.01M1 7V7.01M1 13V13.01" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </button>
                      </li>

                  </ul>
         

                </div>
            </div>

            <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg h-9 my-2">
              <input type="text" placeholder='Remitente' className='!border-transparent text-black-1000 text-xs placeholder:text-black-1000 h-full w-full px-6 rounded-lg !ring-0 !shadow-none  !outline-none !ring-offset-0' />
            </div>

            <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg h-9 my-2">
              <input type="text" placeholder='Asunto' className='!border-transparent text-black-1000 text-xs placeholder:text-black-1000 h-full w-full px-6 rounded-lg !ring-0 !shadow-none  !outline-none !ring-offset-0' />
            </div>

            <textarea name="message" id="message" placeholder='Cuerpo de correo' className='w-full h-[221px] focus:border-gray-1000 text-black-1000 text-xs placeholder:text-black-1000 border  border-gray-1000 rounded-lg px-6 py-2 !ring-0 !shadow-none  !outline-none !ring-offset-0'></textarea>

          </div>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure as="div" className="disclosure-form  rounded-lg mb-1.5" defaultOpen={true}>
        <DisclosureButton className="group flex items-center gap-[20px] rounded-lg justify-between w-full p-2 text-purple-1000 bg-purple-2000">
          <div className='flex items-center gap-[20px]'>
          <span className='rounded-md flex items-center justify-center'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            </span>
          <span className="text-15 font-bold">
          Whatsapp
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10L12 16L18 10H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="lg:pl-10 mt-[17px]">
          <div className='w-full'>
          <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg h-9 my-2">
              <input type="text" placeholder='Número remitente' className='!border-transparent text-black-1000 text-xs placeholder:text-black-1000 h-full w-full px-6 rounded-lg !ring-0 !shadow-none  !outline-none !ring-offset-0' />
            </div>
            <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg px-6 h-9 mb-2">
                <div>
                  <ul className='flex items-center justify-center '>
          
                    <li className='inline-flex items-center justify-center'>
                      <button>
                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8C7.92826 8 8.8185 7.63125 9.47487 6.97487C10.1313 6.3185 10.5 5.42826 10.5 4.5C10.5 3.57174 10.1313 2.6815 9.47487 2.02513C8.8185 1.36875 7.92826 1 7 1H1V8M7 8H1M7 8H8C8.92826 8 9.8185 8.36875 10.4749 9.02513C11.1313 9.6815 11.5 10.5717 11.5 11.5C11.5 12.4283 11.1313 13.3185 10.4749 13.9749C9.8185 14.6313 8.92826 15 8 15H1V8" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                    </li>

                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H17M7 19H13M14 5L10 19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                      </li>

                      
                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 8H15.01M3 16L8 11C8.928 10.107 10.072 10.107 11 11L16 16M14 14L15 13C15.928 12.107 17.072 12.107 18 13L21 16M3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      </li>


                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C19.995 7.58378 16.4162 4.00496 12 4ZM12 18C10.42 18.0267 8.9266 17.28 8 16C7.55008 15.3983 7.21141 14.721 7 14H17C17 14 17 14 17 14.008C16.7853 14.7252 16.4469 15.3994 16 16C15.0733 17.2799 13.5799 18.0266 12 18ZM8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5C10 11.3284 9.32843 12 8.5 12ZM15.493 11.986C14.6684 11.986 14 11.3176 14 10.493C14 9.66844 14.6684 9 15.493 9C16.3176 9 16.986 9.66844 16.986 10.493C16.9849 11.3171 16.3171 11.9849 15.493 11.986Z" fill="#4F4F4F"/>
                      </svg>

                      </button>
                      </li>

                  </ul>
         

                </div>
            </div>

            <textarea name="message" id="Mensaje" placeholder='Mensaje' className='w-full h-[221px] focus:border-gray-1000 text-black-1000 text-xs placeholder:text-black-1000 border  border-gray-1000 rounded-lg px-6 py-2 !ring-0 !shadow-none  !outline-none !ring-offset-0'></textarea>

          </div>
        </DisclosurePanel>
      </Disclosure>


      <Disclosure as="div" className="disclosure-form  rounded-lg mb-1.5" defaultOpen={true}>
        <DisclosureButton className="group flex items-center gap-[20px] rounded-lg justify-between w-full p-2 text-purple-1000 bg-purple-2000">
          <div className='flex items-center gap-[20px]'>
          <span className='rounded-md flex items-center justify-center'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            </span>
          <span className="text-15 font-bold">
          SMS
          </span>
          </div>
        <span className='rotate-90 group-data-[open]:rotate-0'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10L12 16L18 10H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        </DisclosureButton>
        <DisclosurePanel className="lg:pl-10 mt-[17px]">
          <div className='w-full'>
          <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg h-9 my-2">
              <input type="text" placeholder='Número remitente' className='!border-transparent text-black-1000 text-xs placeholder:text-black-1000 h-full w-full px-6 rounded-lg !ring-0 !shadow-none  !outline-none !ring-offset-0' />
            </div>
            <div className="w-full flex items-center justify-between border border-gray-1000 rounded-lg px-6 h-9 mb-2">
                <div>
                  <ul className='flex items-center justify-center '>
          
                    <li className='inline-flex items-center justify-center'>
                      <button>
                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8C7.92826 8 8.8185 7.63125 9.47487 6.97487C10.1313 6.3185 10.5 5.42826 10.5 4.5C10.5 3.57174 10.1313 2.6815 9.47487 2.02513C8.8185 1.36875 7.92826 1 7 1H1V8M7 8H1M7 8H8C8.92826 8 9.8185 8.36875 10.4749 9.02513C11.1313 9.6815 11.5 10.5717 11.5 11.5C11.5 12.4283 11.1313 13.3185 10.4749 13.9749C9.8185 14.6313 8.92826 15 8 15H1V8" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                    </li>

                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5H17M7 19H13M14 5L10 19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      </button>
                      </li>

                      
                    <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                      </button>
                      </li>

                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 8H15.01M3 16L8 11C8.928 10.107 10.072 10.107 11 11L16 16M14 14L15 13C15.928 12.107 17.072 12.107 18 13L21 16M3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      </li>


                      <li className='inline-flex items-center justify-center 2xl:ml-1.5'>
                      <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C19.995 7.58378 16.4162 4.00496 12 4ZM12 18C10.42 18.0267 8.9266 17.28 8 16C7.55008 15.3983 7.21141 14.721 7 14H17C17 14 17 14 17 14.008C16.7853 14.7252 16.4469 15.3994 16 16C15.0733 17.2799 13.5799 18.0266 12 18ZM8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5C10 11.3284 9.32843 12 8.5 12ZM15.493 11.986C14.6684 11.986 14 11.3176 14 10.493C14 9.66844 14.6684 9 15.493 9C16.3176 9 16.986 9.66844 16.986 10.493C16.9849 11.3171 16.3171 11.9849 15.493 11.986Z" fill="#4F4F4F"/>
                      </svg>

                      </button>
                      </li>

                  </ul>
         

                </div>
            </div>

            <div className='relative'>
              <label htmlFor="Mensaje" className='text-xs text-gray-17000 absolute bottom-5 right-5'>
              140 caracteres
              </label>
            <textarea name="message" id="Mensaje" placeholder='Mensaje' className='w-full h-[221px] focus:border-gray-1000 text-black-1000 text-xs placeholder:text-black-1000 border  border-gray-1000 rounded-lg px-6 py-2 !ring-0 !shadow-none  !outline-none !ring-offset-0'></textarea>
            </div>

          </div>
        </DisclosurePanel>
      </Disclosure>

        </div>
        
        </form>
  
    </div>
  )
}

export default NotificacionesForm