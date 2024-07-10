"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { getAllFilesByStaffId } from "@/services/FileManagerService";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

export default function Files({ params: { lng, staff_id } }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getAllFilesByStaffId(staff_id).then((response) => {
      setFiles(response.data);
      setLoading(false)
    });
  }, []);
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
  return (
    <>
      <Breadcrumbs
        items={[
          { text: "Home", path: `/` },
          {
            text: "Gestor de Archivos",
            path: `/${lng}/admin/directory/files/${staff_id}`,
          },
        ]}
      />
      <div className="mt-4 flex justify-start">
        <Link
          href="../"
          className="flex items-center text-2xl font-bold justify-center gap-4"
        >
          <span>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7.5H15M1 7.5L7 13.5M1 7.5L7 1.5"
                stroke="#1C1C1C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          Gestor de archivos
        </Link>
      </div>
      <div className="flex w-full justify-center mt-2">
        <div className="w-2/4">
          <div className="flex w-full justify-center font-bold my-2">
            Buscar archivos
          </div>
          <div className="flex w-full justify-center mb-2">
            <div className="flex w-11/12 border-2 rounded-lg p-2">
              <div className="w-1/12 flex justify-center items-center h-full">
                <HiOutlineSearch />
              </div>
              <div className="w-full items-center h-full">
                <input
                  className="w-full h-full focus:outline-none"
                  placeholder="Buscar"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**
       * Render the table
       */}
      {loading ? (
        <div className="flex items-center justify-center mb-4">
          <ClipLoader
            color={"#8049D7"}
            loading={loading}
            cssOverride={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="mx-5 text-left font-bold text-gray-600 flex py-4">
            <h1 className="w-7/12">Nombre</h1>
            <h1 className="w-3/12">Descripción</h1>
            <h1 className="w-2/12">Fecha</h1>
            <h1></h1>
          </div>
          <div className="border-2 border-gray-400 rounded-lg">
            {files.map((item, index) => {
              return (
                <div
                  className="mx-5 my-3 border-2 border-gray-400 rounded-lg"
                  key={index}
                >
                  <div className="flex py-2">
                    <h1 className="w-7/12">{item.fileName}</h1>
                    <h1 className="w-3/12">{item.typeDocument}</h1>
                    <h1 className="w-2/12">
                      {moment(item.update_create).format("YYYY-MM-DD")}
                    </h1>
                    <h1>
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={renderTrigger}
                      >
                        <Link href={item.downloadLink} target="_blank">
                          <Dropdown.Item className="text-green-800 block text-sm  w-full text-left capitalize">
                            <i className="fa fa-download"></i> Descargar
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          onClick={() => {
                            deleteElement(data);
                          }}
                          className="text-red-800 block text-sm  w-full text-left capitalize"
                        >
                          <i className="fa fa-trash"></i> Eliminar
                        </Dropdown.Item>
                      </Dropdown>
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
