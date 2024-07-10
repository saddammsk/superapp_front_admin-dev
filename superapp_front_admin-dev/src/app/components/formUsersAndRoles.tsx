"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';

// Definición de interfaces
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  permissions: Permissions[];
}

interface Role {
  name: string;
  permissions: Permissions[];
}

export interface Permissions {
  name: string;
  text: string;
  value: boolean;
  subMenu: Permissions[];
}

const FormUsersAndRoles: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    permissions: [],
  });

  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const roles: Role[] = [
    {
      name: 'Administrador',
      permissions: [
        {
          name: 'Comenzar',
          text: 'Comenzar',
          value: true,
          subMenu: [],
        },
        {
          name: 'Estadisticas',
          text: 'Estadísticas',
          value: true,
          subMenu: [],
        },
        {
          name: 'Plantillas',
          text: 'Plantillas',
          value: true,
          subMenu: [
            {
              name: 'Plantillas-Documentos',
              text: 'Documentos',
              value: true,
              subMenu: [],
            },
            {
              name: 'Plantillas-Notificaciones',
              text: 'Notificaciones',
              value: true,
              subMenu: [
                {
                  name: 'Plantillas-Notificaciones-Ver',
                  text: 'Ver',
                  value: true,
                  subMenu: [],
                },
                {
                  name: 'Plantillas-Notificaciones-Editar',
                  text: 'Editar',
                  value: true,
                  subMenu: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Flujos-trabajo',
          text: 'Flujos de trabajo',
          value: true,
          subMenu: [
            {
              name: 'Flujos-trabajo-Ver',
              text: 'Ver',
              value: true,
              subMenu: [],
            },
            {
              name: 'Flujos-trabajo-Editar',
              text: 'Editar',
              value: true,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Grupos',
          text: 'Grupos',
          value: true,
          subMenu: [],
        },
        {
          name: 'Directorio',
          text: 'Directorio',
          value: true,
          subMenu: [],
        },
        {
          name: 'Historial-Emisiones',
          text: 'Historial de Emisiones',
          value: true,
          subMenu: [
            {
              name: 'Historial-Emisiones-Ver',
              text: 'Ver',
              value: true,
              subMenu: [],
            },
            {
              name: 'Historial-Emisiones-Editar',
              text: 'Editar',
              value: true,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Ajustes',
          text: 'Ajustes',
          value: true,
          subMenu: [
            {
              name: 'Ajustes-Roles-permisos',
              text: 'Roles y permisos',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-Equipo',
              text: 'Equipo',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-modos-firma',
              text: 'modos de firma',
              value: true,
              subMenu: [],
            },
            {
              name: 'Ajustes-Parametros-dinamicos',
              text: 'Parámetros dinámicos',
              value: true,
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Coordinador',
      permissions: [
        {
          name: 'Comenzar',
          text: 'Comenzar',
          value: true,
          subMenu: [],
        },
        {
          name: 'Estadisticas',
          text: 'Estadísticas',
          value: true,
          subMenu: [],
        },
        {
          name: 'Plantillas',
          text: 'Plantillas',
          value: true,
          subMenu: [
            {
              name: 'Documentos-Plantillas',
              text: 'Documentos',
              value: true,
              subMenu: [],
            },
            {
              name: 'Plantillas-Notificaciones',
              text: 'Notificaciones',
              value: true,
              subMenu: [
                {
                  name: 'Plantillas-Notificaciones-Ver',
                  text: 'Ver',
                  value: true,
                  subMenu: [],
                },
                {
                  name: 'Plantillas-Notificaciones-Editar',
                  text: 'Editar',
                  value: false,
                  subMenu: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Flujos-trabajo',
          text: 'Flujos de trabajo',
          value: true,
          subMenu: [
            {
              name: 'Flujos-trabajo-Ver',
              text: 'Ver',
              value: true,
              subMenu: [],
            },
            {
              name: 'Flujos-trabajo-Editar',
              text: 'Editar',
              value: false,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Grupos',
          text: 'Grupos',
          value: true,
          subMenu: [],
        },
        {
          name: 'Directorio',
          text: 'Directorio',
          value: true,
          subMenu: [],
        },
        {
          name: 'Historial-Emisiones',
          text: 'Historial de Emisiones',
          value: true,
          subMenu: [
            {
              name: 'Historial-Emisiones-Ver',
              text: 'Ver',
              value: true,
              subMenu: [],
            },
            {
              name: 'Historial-Emisiones-Editar',
              text: 'Editar',
              value: true,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Ajustes',
          text: 'Ajustes',
          value: false,
          subMenu: [
            {
              name: 'Ajustes-Roles-permisos',
              text: 'Roles y permisos',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-Equipo',
              text: 'Equipo',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-modos-firma',
              text: 'modos de firma',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-Parametros-dinamicos',
              text: 'Parámetros dinámicos',
              value: false,
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Reportería',
      permissions: [
        {
          name: 'Comenzar',
          text: 'Comenzar',
          value: false,
          subMenu: [],
        },
        {
          name: 'Estadisticas',
          text: 'Estadísticas',
          value: true,
          subMenu: [],
        },
        {
          name: 'Plantillas',
          text: 'Plantillas',
          value: false,
          subMenu: [
            {
              name: 'Plantillas-Documentos',
              text: 'Documentos',
              value: false,
              subMenu: [],
            },
            {
              name: 'Plantillas-Notificaciones',
              text: 'Notificaciones',
              value: false,
              subMenu: [
                {
                  name: 'Plantillas-Notificaciones-Ver',
                  text: 'Ver',
                  value: false,
                  subMenu: [],
                },
                {
                  name: 'Plantillas-Notificaciones-Editar',
                  text: 'Editar',
                  value: false,
                  subMenu: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Flujos-trabajo',
          text: 'Flujos de trabajo',
          value: false,
          subMenu: [
            {
              name: 'Flujos-trabajo-Ver',
              text: 'Ver',
              value: false,
              subMenu: [],
            },
            {
              name: 'Flujos-trabajo-Editar',
              text: 'Editar',
              value: false,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Grupos',
          text: 'Grupos',
          value: false,
          subMenu: [],
        },
        {
          name: 'Directorio',
          text: 'Directorio',
          value: false,
          subMenu: [],
        },
        {
          name: 'Historial-Emisiones',
          text: 'Historial de Emisiones',
          value: true,
          subMenu: [
            {
              name: 'Historial-Emisiones-Ver',
              text: 'Ver',
              value: true,
              subMenu: [],
            },
            {
              name: 'Historial-Emisiones-Editar',
              text: 'Editar',
              value: false,
              subMenu: [],
            },
          ],
        },
        {
          name: 'Ajustes',
          text: 'Ajustes',
          value: false,
          subMenu: [
            {
              name: 'Ajustes-Roles-permisos',
              text: 'Roles y permisos',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-Equipo',
              text: 'Equipo',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-modos-firma',
              text: 'modos de firma',
              value: false,
              subMenu: [],
            },
            {
              name: 'Ajustes-Parametros-dinamicos',
              text: 'Parámetros dinámicos',
              value: false,
              subMenu: [],
            },
          ],
        },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, parentIndex: number | null = null, grandParentIndex: number | null = null) => {
    const { checked } = e.target;

    const updatePermissions = (permissions: Permissions[], index: number, parentIndex: number | null, grandParentIndex: number | null) => {
      let count3 = 0;
      let count2 = 0;
      if (grandParentIndex !== null && parentIndex !== null) {
        if(checked){
          permissions[grandParentIndex].subMenu[parentIndex].subMenu[index].value = checked;
          permissions[grandParentIndex].subMenu[parentIndex].value = checked;
          permissions[grandParentIndex].value = checked;
        } else {
          permissions[grandParentIndex].subMenu[parentIndex].subMenu[index].value = checked;
          permissions[grandParentIndex].subMenu[parentIndex].subMenu.forEach((item) => {
            if(!item.value){
              count3++;
            }
          })
          permissions[grandParentIndex].subMenu.forEach((item) => {
            if(!item.value){
              count2++;
            }
          })
          if(count3 === permissions[grandParentIndex].subMenu[parentIndex].subMenu.length){
            permissions[grandParentIndex].subMenu[parentIndex].value = checked;
          }
          if(count2 === permissions[grandParentIndex].subMenu.length){
            permissions[grandParentIndex].value = checked;
          }
        }
      } else if (parentIndex !== null) {
        if(checked){
          permissions[parentIndex].subMenu[index].value = checked;
          permissions[parentIndex].value = checked;
          permissions[parentIndex].subMenu[index].subMenu?.forEach((item) => {
            item.value = checked
          })
        } else {
          permissions[parentIndex].subMenu[index].value = checked;
          permissions[parentIndex].subMenu.forEach((item) => {
            if(!item.value){
              count3++;
            }
          })
          permissions[parentIndex].subMenu[index].subMenu?.forEach((item) => {
            item.value = checked
          })
          if(count3 === permissions[parentIndex].subMenu.length){
            permissions[parentIndex].value = checked;
          }
        }
      } else {
          permissions[index].value = checked;
          permissions[index].subMenu?.forEach((subMenu) => {
            subMenu.value = checked
          })
          permissions[index].subMenu?.forEach((subMenu) => {
            subMenu.value = checked
            subMenu.subMenu?.forEach((subSubMenu) => {
              subSubMenu.value = checked
            })
          })
      }
    };

    setFormData((prevFormData) => {
      const updatedPermissions = [...prevFormData.permissions];
      updatePermissions(updatedPermissions, index, parentIndex, grandParentIndex);
      return {
        ...prevFormData,
        permissions: updatedPermissions,
      };
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    const role = roles.find((role) => role.name === selectedRole);

    if (role) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        role: selectedRole,
        permissions: role.permissions,
      }));
    }
  };

  const handleSubMenuToggle = (menuName: string) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [menuName]: !prevOpenSubMenus[menuName],
    }));
  };

  const renderPermissions = (permissions: Permissions[], parentIndex: number | null = null, grandParentIndex: number | null = null) => {
    return permissions.map((permission, index) => (
      <div key={permission.name} className={`pl-${parentIndex !== null ? 4 : 0}`}>
        <label className="flex items-left">
        <span>
            <input
              type="checkbox"
              checked={permission.value}
              onChange={(e) => {
                handleCheckboxChange(e, index, parentIndex, grandParentIndex)
              }}
              className="mr-2"
            />
            {permission.text}
          </span>
          {permission.subMenu.length > 0 && (
            <button type="button" onClick={() => handleSubMenuToggle(permission.name)} className="text-blue-500 ml-2">
                {openSubMenus[permission.name] ? '-' : '+'}
            </button>)
          }
        </label>
        {permission.subMenu.length > 0 && (
          <div className='flex'>
            {openSubMenus[permission.name] && (
              <div className="pl-4">
                {renderPermissions(permission.subMenu, index, parentIndex)}
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-md p-6">
      <h2 className="text-xl font-bold mb-4">Registro de usuarios</h2>
      <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700">
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Teléfono:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Rol:
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded"
            >
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          {formData.permissions.length > 0 && <h3 className="text-gray-700">Permisos:</h3>}
          {renderPermissions(formData.permissions)}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormUsersAndRoles;

